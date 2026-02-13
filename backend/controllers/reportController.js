const Report = require("../models/Report");
const callLLama = require("../config/llama");
const generatePrompt = require("../config/promptTemplate");

exports.analyzeReport = async (req, res) => {
  try {
    const { reportText, age, bodyPart } = req.body;

    if (!reportText || reportText.trim() === "") {
      return res.status(400).json({ message: "MRI report text is required" });
    }

    const prompt = generatePrompt(reportText);
    console.log("Generated Prompt:", prompt);
    const aiResponseText = await callLLama(prompt);
    console.log("AI Raw Response:", aiResponseText);

    const parseSection = (sectionName, text) => {
      const regex = new RegExp(
        `(\\[${sectionName}\\]|\\*\\*${sectionName}\\*\\*|${sectionName}:)([\\s\\S]*?)(?=\\n\\s*(\\[|\\*\\*|[A-Z\\s]{3,}:)|$)`,
        "i"
      );
      const match = text.match(regex);
      return match ? match[2].trim() : "";
    };

    const observationsRaw = parseSection("OBSERVATIONS", aiResponseText);
    const summary = parseSection("SUMMARY", aiResponseText);
    const notes = parseSection("NOTES", aiResponseText);
    const terminologyRaw = parseSection("TERMINOLOGY", aiResponseText);

    const observations = observationsRaw
      .split("\n")
      .map((item) => item.replace(/^- /, "").trim())
      .filter((item) => item !== "");

    const terminology = terminologyRaw
      .split("\n")
      .map((line) => {
        // Clean up the line: remove bullet points, numbers, and bolding
        const cleanedLine = line.replace(/^[\s\d.*-]*\s*/, "").replace(/\*\*/g, "").trim();
        if (!cleanedLine) return null;

        // Handle different separators: colon, dash, or en-dash
        const separatorRegex = /[:\-\u2013]/;
        const parts = cleanedLine.split(separatorRegex);
        if (parts.length < 2) return null;

        const term = parts[0].trim();
        const meaning = parts.slice(1).join(" ").trim();

        return { term, meaning };
      })
      .filter((item) => item && item.term && item.meaning);

    const aiSummary = {
      observations,
      simplifiedSummary: summary || aiResponseText,
      importantNotes: notes,
      terminology,
      disclaimer:
        "This AI-generated summary is for documentation assistance only and does not replace professional medical judgment.",
    };

    const report = await Report.create({
      user: req.user._id,
      reportText,
      age,
      bodyPart,
      aiSummary,
    });

    res.status(201).json(report);
  } catch (error) {
    console.error("Detailed Analysis Error:", error);
    res.status(500).json({
      message: "AI processing failed",
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};


exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findOne({ _id: req.params.id, user: req.user._id });
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch report" });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete report" });
  }
};
