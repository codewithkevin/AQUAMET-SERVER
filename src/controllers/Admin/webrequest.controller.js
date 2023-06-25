import { Demo } from "../../model/Users/website/demo.js";
import { SmartProbe } from "../../model/Users/website/smartProbe.js";
import { FarmRequest } from "../../model/Users/website/farmRequest.js";

const getDemoRequests = async (req, res) => {
  try {
    const demoRequests = await Demo.find();
    res.status(200).send({ demoRequests });
  } catch (error) {
    res.status(500).send({ message: "Failed to retrieve demo requests" });
  }
};

const getSmartProbeRequests = async (req, res) => {
  try {
    const smartProbeRequests = await SmartProbe.find();
    res.status(200).send({ smartProbeRequests });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to retrieve smart probe requests" });
  }
};

const getFarmRequests = async (req, res) => {
  try {
    const farmRequests = await FarmRequest.find();
    res.status(200).send({ farmRequests });
  } catch (error) {
    res.status(500).send({ message: "Failed to retrieve farm requests" });
  }
};

export { getDemoRequests, getSmartProbeRequests, getFarmRequests };
