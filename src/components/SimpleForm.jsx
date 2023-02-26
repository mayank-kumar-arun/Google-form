import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import * as Yup from "yup";

// const SimpleForm = () => {
//   const rows = [
//     { name: "", age: "", sex: "", zone: "" , weight: "" , height:"" , bmi: "", durationOfDM: "", HbA1cBefore: "", HbA1cNow: "" , GlucoseStatus: "", Value: "", NameOfOAH: "", Insulin: "" , DDP4: "" , NameOfSGLT2: "", DurationOfSGLT2: "" , TypeOfUTI: "" , TypeOfGTI: "" , SGLT2iStatus: "", Severity: "" , AggravatingFactors: "", Hygiene: "", CircumcisionStatus: "" , Comment: ""},
//     { name: "", age: "", sex: "", zone: "" , weight: "" , height:"" , bmi: "", durationOfDM: "", HbA1cBefore: "", HbA1cNow: "" , GlucoseStatus: "", Value: "", NameOfOAH: "", Insulin: "" , DDP4: "" , NameOfSGLT2: "", DurationOfSGLT2: "" , TypeOfUTI: "" , TypeOfGTI: "" , SGLT2iStatus: "", Severity: "" , AggravatingFactors: "", Hygiene: "", CircumcisionStatus: "" , Comment: ""},
//   ];
//   const [columns, setColumns] = useState(25);

//   const onSubmit = (values, { setSubmitting, resetForm }) => {
//     setTimeout(() => {
//       console.log(JSON.stringify(values, null, 2));
//       setSubmitting(false);
//       resetForm();
//     }, 400);
//   };

//   console.log(columns)

//   return (
//     <Formik
//       initialValues={{ rows }}
//       onSubmit={onSubmit}
//     >
//       {({ values, setFieldValue }) => (
//         <Form>
//           <div className="container mt-4 pt-3">
//             <div
//               className="table-responsive mb-4"
//               style={{ overflowY: "auto" }}
//             >
//               <table>
//                 <thead>
//                   <tr>
//                     <th>Name</th>
//                     <th>Age</th>
//                     <th>Sex</th>
//                     <th>Zone</th>
//                     <th>Weight(kg)</th>
//                     <th>Height(CM)</th>
//                     <th>BMI</th>
//                     <th>Duration of DM</th>
//                     <th>HbA1c (Before)</th>
//                     <th>HbA1c (Now)</th>
//                     <th>Glucose Status</th>
//                     <th>Value</th>
//                     <th>Name of OAH</th>
//                     <th>Insulin</th>
//                     <th>DDP4 1</th>
//                     <th>Name of SGLT2</th>
//                     <th>Duration of SGLT</th>
//                     <th>Type of UTI</th>
//                     <th>Type of GTI</th>
//                     <th>SGLT2i Status</th>
//                     <th>Severity</th>
//                     <th>Aggravating Factors</th>
//                     <th>Hygiene</th>
//                     <th>Circumcision Status</th>
//                     <th>Comment</th>
//                     <th></th>
//                     <th>
//                       <button
//                         className="btn btn-sm m-2 btn-primary"
//                         style={{ minWidth: "76px" }}
//                         type="button"
//                         onClick={() => {
//                           setColumns(columns + 1);
//                         }}
//                       >
//                         Add Test
//                       </button>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {values.rows.map((row, index) => (
//                     <tr key={index}>
//                       {Array.from({ length: columns }).map((xyz, i) => (
//                         <td key={i}>
//                           <Field
//                             as="textarea"
//                             name={`rows[${index}].name`}
//                           />
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//             <div className="text-end">
//               <button className="btn btn-success mt-4" type="submit">
//                 Submit
//               </button>
//             </div>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

function ExampleTable() {
  const label = [
    "name",
    "age",
    "sex",
    "zone",
    "weight",
    "height",
    "bmi",
    "durationOfDM",
    "HbA1cBefore",
    "HbA1cNow",
    "GlucoseStatus",
    "Value",
    "NameOfOAH",
    "Insulin",
    "DDP4",
    "NameOfSGLT2",
    "DurationOfSGLT2",
    "TypeOfUTI",
    "TypeOfGTI",
    "SGLT2iStatus",
    "Severity",
    "AggravatingFactors",
    "Hygiene",
    "CircumcisionStatus",
    "Comment",
  ];
  const [columnNames, setColumnNames] = useState(label);
  const [rows, setRows] = useState([{}]);

  const addColumn = () => {
    const newColumnName = window.prompt("Enter a new Test name:");
    if (newColumnName) {
      setColumnNames([...columnNames, newColumnName]);
    }
  };

  const addRow = () => {
    const newRow = columnNames.reduce((acc, columnName) => {
      acc[columnName.toLowerCase()] = "";
      return acc;
    }, {});
    setRows([...rows, newRow]);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        age: "",
        sex: "",
        class: "",
      }}
      onSubmit={(values) => {
        console.log(JSON.stringify(values, null, 2));
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div className="container mt-4 pt-3">
            <div
              className="table-responsive mb-4"
              style={{ overflowY: "auto" }}
            >
              <table>
                <thead>
                  <tr>
                    {columnNames.map((columnName) => (
                      <th key={columnName}>{columnName}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      {columnNames.map((columnName) => (
                        <td key={columnName}>
                          <Field
                            as="textarea"
                            name={`rows[${index}].${columnName.toLowerCase()}`}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between">
              <div>
                <button
                  type="button "
                  className="btn btn-sm btn-warning me-2"
                  onClick={addColumn}
                >
                  Add Test
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={addRow}
                >
                  Add Row
                </button>
              </div>
              <div>
                <button type="submit" className="btn btn-sm btn-success">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default ExampleTable;
