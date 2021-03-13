import express from "express";
import MetricsService from "../services/MetricsService";
import MetricsResponse from "../models/MetricsResponse";
import AggregateResponse from "../models/AggregateResponse";
import TagResponse from "../models/TagResponse";
import SectorResponse from "../models/SectorResponse";

export const metricsController = express.Router();

const metricsService: MetricsService = new MetricsService();

/**
 * Single asset metrics to for a given asset and the latest news associated with given asset
 */
metricsController.get("/asset/:symbol", async (req: any, res) => {
  let metricsResponse: MetricsResponse;

  try {
    metricsResponse = await metricsService.getCoinMetrics(req.params.symbol);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  res.status(200).json(metricsResponse);
});

/**
 * Aggregate metrics which takes in as query parameter for tags or sectors.
 * As examples: ?sectors=gaming or ?tags=defi,oracle
 * You can define multiple tags or sectors to aggregate.
 */
metricsController.get("/aggregate", async (req: any, res) => {
  let aggregateResponse: AggregateResponse;
  if (req.query.tag) {
    req.query.tags = req.query.tag;
  }

  if (req.query.sector) {
    req.query.sectors = req.query.sector;
  }

  const tags =
    req.query.tags === undefined
      ? undefined
      : req.query.tags.split(",").toLocaleString().toLowerCase();

  const sectors =
    req.query.sectors === undefined
      ? undefined
      : req.query.sectors.split(",").toLocaleString().toLowerCase();

  try {
    aggregateResponse = await metricsService.getAggregateMetrics(tags, sectors);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
  res.status(200).json(aggregateResponse);
});

/**
 * Return all available tags
 */
metricsController.get("/tags", async (req: any, res) => {
  let tagResponse: TagResponse;

  try {
    tagResponse = await metricsService.getTags();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

  res.status(200).json(tagResponse);
});

/**
 * Return all available sectors
 */
metricsController.get("/sectors", async (req: any, res) => {
  let sectorResponse: SectorResponse;

  try {
    sectorResponse = await metricsService.getSectors();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

  res.status(200).json(sectorResponse);
});
