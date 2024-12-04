// src/pages/Introduction.js
import React from "react";
import { Typography, Box } from "@mui/material";
import SearchableTable from "./tableKeywords";

const KeywordsSupported = () => (
  <Box>
    {/* Introduction Section */}
    <Box component="section" id="keywords">
      <Typography variant="h4" component="h1" gutterBottom>
        Keywords Supported
      </Typography>
      <Typography paragraph>
        The following are keywords we used in tandem with Artificial
        Intelligence in order to determine whether a given text is
        health-related or not. It may seem that other keywords are duplicated
        like "COVID19" and "COVID-19" this is to cover possible variation in the
        text.
      </Typography>
      <Typography paragraph>
        Note: The{" "}
        <span
          style={{
            color: "green",
            fontWeight: "bold",
          }}
        >
          "ODS"
        </span>{" "}
        indicator means that CERTAIN DISEASE is also supported in the Book based Mode. If you use a keyword not supported by the Book based Mode, it will output into a irrelevant or empty result.
      </Typography>
      <SearchableTable />
    </Box>
    {/* Pinning Extension Section */}
    <Box component="section" id="language" mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Language Supported
      </Typography>
      <Typography paragraph>
        We are limited by the Natural Language Inference (NLI) or Zero-shot
        classification model we used and the websites we have selected to fact
        check information for. The following are the languages we support:
      </Typography>
      <Typography component="div">
        <ul>
          <li>English</li>
          <li>Tagalog</li>
        </ul>
      </Typography>
      <Typography paragraph>
        If you want to learn about the model we used, we use a variation of{" "}
        <a href="https://huggingface.co/MoritzLaurer/mDeBERTa-v3-base-xnli-multilingual-nli-2mil7">
          mDeBERTa.
        </a>{" "}
        This model is a multilingual model that can understand 100+ languages.
      </Typography>
    </Box>
  </Box>
);

export default KeywordsSupported;
