import React, { useState, useEffect } from "react";
import { config } from "../config/Config";
import VizCard from "./VizCard";
import Loader from "./Loader";

export default function Home({ user, dateRange }) {
  const [chart1Data, setChart1Data] = useState(null);
  const [chart2Data, setChart2Data] = useState(null);
  const [chart3Data, setChart3Data] = useState(null);
  // console.log("CHART 1", chart1Data);
  // console.log("CHART 2", chart2Data);
  // console.log("CHART 3", chart3Data);

  const updateDateRange = (requestBody) => ({
    ...requestBody,
    chartObject: {
      ...requestBody.chartObject,
      requestParam: {
        ...requestBody.chartObject.requestParam,
        dateRange,
      },
    },
  });

  const makeFetchObj = (index) => {
    let body = updateDateRange(config.requestBody[index]);
    let headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Auth-Token": user.token,
    };
    let fetchObj = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    };
    return fetchObj;
  };

  //1st Chart
  useEffect(() => {
    setChart1Data(false);
    let fetchObj = makeFetchObj(0);
    fetch(`${config.rootApi}/api/v1/getData`, fetchObj)
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((json) => {
        // console.log("FETCH OBJ", fetchObj);
        // console.log("CHART 1 JSON", json);
        let valueKey = "impressions_offered";
        if (json.status.statusCode == 304) {
          setChart1Data([]);
        } else if (json.status.statusCode == 200) {
          let data = json.result.data.map((obj) => ({
            ...obj,
            [valueKey]: parseInt(obj[valueKey]),
          }));
          setChart1Data(data);
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [dateRange]);

  //2nd Chart
  useEffect(() => {
    setChart2Data(false);
    let fetchObj = makeFetchObj(1);
    fetch(`${config.rootApi}/api/v1/getData`, fetchObj)
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((json) => {
        // console.log("CHART 2 JSON", json);
        let valueKey = "impressions_offered";
        if (json.status.statusCode == 304) {
          setChart2Data([]);
        } else if (json.status.statusCode == 200) {
          let data = json.result.data.map((obj) => ({
            ...obj,
            [valueKey]: parseInt(obj[valueKey]),
          }));
          setChart2Data(data);
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [dateRange]);

  //3rd Chart
  useEffect(() => {
    setChart3Data(false);
    let fetchObj = makeFetchObj(2);
    fetch(`${config.rootApi}/api/v1/getData`, fetchObj)
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((json) => {
        // console.log("CHART 3 JSON", json);
        let valueKey = "CM001";
        if (json.status.statusCode == 304) {
          setChart3Data([]);
        } else if (json.status.statusCode == 200) {
          let data = json.result.data.map((obj) => ({
            ...obj,
            [valueKey]: parseFloat(obj[valueKey]),
          }));
          setChart3Data(data);
        }
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }, [dateRange]);
  return (
    <main>
      <h1 className="page-title">Welcome!</h1>

      {chart1Data ? (
        <VizCard
          title="Publishers"
          chartType="bar"
          originalData={chart1Data}
          fieldKey="publisherId"
          valueKey="impressions_offered"
        />
      ) : (
        <Loader />
      )}

      {chart3Data ? (
        <VizCard
          title="Advertisers"
          chartType="pie"
          originalData={chart3Data}
          fieldKey="advertiserId"
          valueKey="CM001"
        />
      ) : (
        <Loader />
      )}

      {chart2Data ? (
        <VizCard
          title="App Sites"
          chartType="bar"
          originalData={chart2Data}
          fieldKey="appSiteId"
          valueKey="impressions_offered"
        />
      ) : (
        <Loader />
      )}
    </main>
  );
}
