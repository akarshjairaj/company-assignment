import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import { ascending, descending, format } from "d3";

export default function VizTable({
  data,
  orderBy,
  order,
  setOrder,
  setOrderBy,
  fieldKey,
  valueKey,
  setData,
}) {
  const handleRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    let updData = data
      .slice()
      .sort((a, b) =>
        isAsc
          ? ascending(a[property], b[property])
          : descending(a[property], b[property])
      );
    setData(updData);
  };

  const headCells = [
    {
      id: fieldKey,
      numeric: false,
      disablePadding: true,
      label: fieldKey,
    },
    { id: valueKey, numeric: true, disablePadding: false, label: valueKey },
  ];

  return (
    <TableContainer>
      <Table
        aria-labelledby="tableTitle"
        size="small"
        aria-label="enhanced table"
      >
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? "right" : "left"}
                padding={headCell.disablePadding ? "none" : "default"}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "asc"}
                  onClick={handleRequestSort(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => {
            return (
              <TableRow key={index}>
                <TableCell align="left">{row[fieldKey]}</TableCell>
                <TableCell align="right">{format(",d")(row[valueKey])}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
