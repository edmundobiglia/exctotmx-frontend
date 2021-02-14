<h1 align="center">EXCtoTMX</h1>

<p align="center"><img src="./src/assets/demo.gif" width="550"></p>

This is the **frontend** part for simple project **EXCtoTMX** developed with **TypeScript** and **React.js** (repo for the backend part <a href="https://github.com/edmundobiglia/exctotmx-backend">here</a>). This minimal app converts a bilingual **.xlsx** file into a **TMX** file to be imported into translation software (CAT tools).

**TMX** is a type of XML file that contains translation units (source text and corresponding translations) that can be imported into **translation memories** (TMs) from translation software. A TM is a database of translations which is populated as translators translate source files.

## Motivation

Having worked as a translator for many years, I often found myself in a situation where I had an Excel file with existing translations that could be reused in another translation project, so I needed to generate a TMX file to import these existing translations into the translation editor and avoid having to re-type or copy and paste each translation unit.

## How it works

The TMX file is an XML file that follows a common structure, so this app basically allows you to upload a bilingual .xlsx file (source text in column A and translations in column B). The file is read and processed in the backend to generate the proper XML data, which is in turn sent to the frontend for download.

The frontend does some validation, showing an error if:

- The file is not a .xlsx file (checks the extension as well as the MIME type of the uploaded file)
- A source and target language is not selected
- Source and target languages are the same (they must be different)

## Frontend Dependencies

The frontend is built in **TypeScript** with **React.js**. It implements **axios** to call the API and upload the .xlsx file. It uses **styled-components** for styling and also **react-icons**.
