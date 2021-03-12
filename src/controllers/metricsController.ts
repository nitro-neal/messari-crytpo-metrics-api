import express from "express";
import MetricsService from "../services/MetricsService";
import MetricsResponse from "../models/MetricsResponse";
import AggregateResponse from "../models/AggregateResponse";
import TagResponse from "../models/TagResponse";
import SectorResponse from "../models/SectorResponse";

export const metricsController = express.Router();

/*
    Asset metrics: provide an /api/asset/{symbol|slug} endpoint to
    retrieve the asset metrics associated with a given asset
*/
metricsController.get("/asset/:symbol", async (req: any, res) => {
  let metricsResponse: MetricsResponse;

  try {
    metricsResponse = await MetricsService.getCoinMetrics(req.params.symbol);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  res.status(200).json({ msg: metricsResponse });
});

/*
    Aggregate metrics: provide an /api/aggregate endpoint which takes in as
     query parameter ?tags={value}, ?sector={value}. As examples:
*/
metricsController.get("/aggregate", async (req: any, res) => {
  let aggregateResponse: AggregateResponse;

  const tags =
    req.query.tags === undefined
      ? undefined
      : req.query.tags.split(",").toLocaleString().toLowerCase();

  const sectors =
    req.query.sectors === undefined
      ? undefined
      : req.query.sectors.split(",").toLocaleString().toLowerCase();

  try {
    aggregateResponse = await MetricsService.getAggregateMetrics(tags, sectors);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  res.status(200).json({ msg: aggregateResponse });
});

/*
  Get a list of all tags
*/
metricsController.get("/tags", async (req: any, res) => {
  let tagResponse: TagResponse;

  try {
    tagResponse = await MetricsService.getTags();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

  res.status(200).json(tagResponse);
});

/*
  Get a list of all sectors
*/
metricsController.get("/sectors", async (req: any, res) => {
  let sectorResponse: SectorResponse;

  try {
    sectorResponse = await MetricsService.getSectors();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

  res.status(200).json(sectorResponse);
});
