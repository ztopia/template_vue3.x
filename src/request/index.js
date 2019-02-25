"use strict";

import axios from "axios";
import md5 from "md5";
const search = {};
window.location.search
  .slice(1)
  .split("&")
  .forEach(item => {
    let res = item.split("=");
    search[res[0]] = res[1];
  });

// 固定参数
const baseinfo = {
  api_channel: search["utm_source"] || "html",
  app_type: "android",
  app_version: 20,
  banner_type: 1,
  channel: "APP",
  device_info: {
    and_id: "",
    gaid: "",
    imei: "",
    sn: "",
    model: "",
    brand: ""
  },
  version: 15
};
const DEV_BASE_URL = "";
const PROD_BASE_URL = "/apis";
const baseURL =
  process.env.NODE_ENV === "production" ? PROD_BASE_URL : DEV_BASE_URL;
// 创建axios实例
const service = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json;charset=utf-8" },
  method: "post",
  responseType: "json",
  transformRequest(data) {
    let sortdata = {};
    data = Object.assign({}, baseinfo, data);
    Object.keys(data)
      .sort()
      .map(item => {
        sortdata[item] = data[item];
      });
    const time = new Date().valueOf();
    const sign = md5(
      md5(`zymaonian@html@tao!cashcash*|*${JSON.stringify(sortdata)}@!@${time}`)
    );
    const form = new FormData();
    form.append(
      "data",
      JSON.stringify(Object.assign({}, sortdata, { sign, timestamp: time }))
    );
    return form;
  }
});

// request拦截器
service.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

// respone拦截器
service.interceptors.response.use(
  response => {
    if (+response.status !== 200) {
      return Promise.reject(response);
    }

    const data = response.data;
    if (+data.code === 0 && data.hasOwnProperty("data")) {
      return data.data;
    } else {
      return Promise.reject(response);
    }
  },
  error => Promise.reject(error)
);

export default service;
