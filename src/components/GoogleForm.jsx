import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";
import "./GoogleForm.css";

const frequencyOfDoctorConsultOption = [
  { label: "Monthly", value: "monthly" },
  { label: "Once in about 3 months", value: "Once in about 3 months" },
  { label: "Once in about 4 months", value: "Once in about 4 months" },
  { label: "Once in about 6 months", value: "Once in about 6 months" },
  {
    label: "Less frequent than once in 6months",
    value: "Less frequent than once in 6months",
  },
  { label: "As and when I feel like", value: "As and when I feel like" },
];

const diabetesIsAConditionInwhichTheBodyContainsOptions = [
  {
    label: "A higher level of sugar in the blood than normal.",
    value: "A higher level of sugar in the blood than normal.",
  },
  {
    label: "A lower level of sugar in the blood than normal.",
    value: "A lower level of sugar in the blood than normal.",
  },
  {
    label:
      "Either a higher or a lower level of sugar in the blood than normal.",
    value:
      "Either a higher or a lower level of sugar in the blood than normal.",
  },
  { label: "I don’t know", value: "I don’t know" },
];

const majorCauseOfDiabetesIsOptions = [
  {
    label: "An increased availability of insulin in the body",
    value: "An increased availability of insulin in the body",
  },
  {
    label: "A decreased availability of insulin in the body",
    value: "A decreased availability of insulin in the body",
  },
  { label: "I don’t know", value: "I don’t know" },
];

const usuallySleepAroundSameTimeEveryday = [
  { label: "Always", value: "Always" },
  { label: "Often", value: "Often" },
  { label: "Sometimes", value: "Sometimes" },
  { label: "Rarely", value: "Rarely" },
];

const AlcoholComsuption = [
  { label: "Never", value: "Never" },
  { label: "Only On Social Occasions", value: "Only On Social Occasions" },
  { label: "About once a week", value: "About once a week" },
  { label: "More than once a week", value: "More than once a week" },
];

const smoked = [
  { label: "Yes", value: "Yes" },
  { label: "No", value: "No" },
];

const noOfDaysOfTakingDiabeticMedications = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "None", value: "None" },
];

const uponControlOfDiabetesTheMedicines = [
  { label: "Can be stopped immediately", value: "Can be stopped immediately" },
  {
    label: "Can be stopped after a month",
    value: "Can be stopped after a month",
  },
  {
    label: "Should continue with medications",
    value: "Should continue with medications",
  },
  { label: "Not sure / Don't Know", value: "Not sure / Don't Know" },
];

const educatedAboutUncontrolledDiabetes = [
  { label: " Yes, recently", value: "Yes, recently" },
  { label: "Yes, sometime back", value: "Yes, sometime back" },
  { label: "No", value: "No" },
];

const AreYouAwareOfBloodSugarLevelsFallingBelowNormalWhenYouAreTakingMedicines =
  [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

const howDoYouManageHypoglycemicSymptoms = [
  {
    label: "By taking sugar or something to eat",
    value: "By taking sugar or something to eat",
  },
  {
    label: "By taking medicines",
    value: "By taking medicines",
  },
  {
    label: "By taking insulin",
    value: "By taking insulin",
  },
  {
    label: "None",
    value: "None",
  },
];

const consultingDoctorRegularly = [
  { label: "10 - Very important", value: "10 - Very important" },
  { label: "9", value: "9" },
  { label: "8", value: "8" },
  { label: "7", value: "7" },
  { label: "6", value: "6" },
  { label: "5", value: "5" },
  { label: "4", value: "4" },
  { label: "3", value: "3" },
  { label: "2", value: "2" },
  { label: "1 - Not at all important", value: "1 - Not at all important" },
];

const initialValues = {
  patientID: "",
  initials: "",
  age: "",
  gender: "",
  height: "",
  weight: "",
  bmi: "",
  city: "",
  state: "",
  TypeofDiabetes: "",
  DurationofDiabetes: "",
  rbs: "",
  HbA1c: "",
  LDL: "",
  eGFR: "",
  HDL: "",
  BloodPressureSystolic: "",
  BloodPressureDiastolic: "",
  FrequencyofDoctorconsult: "",
  diabetesComplications: [],
  otherdiabetesComplications: "",
  knownMedicalConditions: [],
  otherKnownMedicalConditions: "",
  currentClassOfMedicationsOn: [],
  otherCurrentClassOfMedicationsOn: "",
  diabetesIsAConditionInwhichTheBodyContains: "",
  majorCauseOfDiabetesIs: "",
  symptomsOfDiabetes: [],
  diabetesIfNotTreated: [],
  lifestyleModificationRequiredForDiabeticPatients: [],
  haveYouReceivedDietCounselling: "",
  otherDietCounselling: "",
  noOfDiet: "",
  noOfSnacks: "",
  dietType: "",
  doYouHaveBreakfastRegularly: "",
  whatTimeDoYouHaveDinner: "",
  howWouldYouClassifyYourAppetite: "",
  InTheLast7DaysOnHowManyDaysHaveYouFollowedAHealthyEatingPlan: "",
  regularPhysicalActivity: [],
  hoursOfExerciseInLastSevenDays: "",
  participationInAtleastThirtyMinutesPhyActivity: "",
  hoursOfSleep: "",
  satisfiedWithSleep: "",
  difficultyFallingAsleep: "",
  feelRefreshAfterSleep: "",
  alcoholComsuption: "",
  smoked: "",
  diabeticMedication: "",
  glucometer: "",
  bloodPressureMonitoringDevice: "",
  inHowManyOfTheLast7DaysDidYouTestYourBloodSugar: "",
  inHowManyOfTheLast7DaysDidYouTestYourBloodPressure: "",
  bloodSugarCheckedLast: "",
  bloodPressureCheckedLast: "",
  educatedAboutUncontrolledDiabetes: "",
  complicationsDuesToUncontrolledDiabetes: [],
  InADiabeticPatientHighBloodPressureCanIncreaseOrWorsen: [],
  inTheLast1WeekHowManyTimesDidYouCheckYourFeet: "",
  inTheLast1WeekHowManyTimesDidYouWashYourFeet: "",
  AreYouAwareOfBloodSugarLevelsFallingBelowNormalWhenYouAreTakingMedicines: "",
  consultingDoctorRegularly: "",
  qualitySleepEveryday: "",
  haveRoutineForDayToDayActivities: "",
  haveBodyWeightUnderControl: "",
  haveQualityDiet: "",
  controlTheQuantityOfFood: "",
  takingMedicationsAsDirectedByDoctor: "",
  physicalActivityEveryDayForAtLeast30Min: ""
};

const validationSchema = Yup.object({
  patientID: Yup.string().required("Required"),
  initials: Yup.string().required("Required"),
  age: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  height: Yup.string().required("Required"),
  weight: Yup.string().required("Required"),
  noOfDiet: Yup.string().required("Required"),
  noOfSnacks: Yup.string().required("Required"),
});

function GoogleForm() {
  const diabetesComplications = [
    "Diabetic Foot",
    "Retinopathy",
    "Neuropathy",
    "Nephropathy",
    "Coronary Heart Disease",
  ];

  const knownMedicalConditions = [
    "Hypertension",
    "Dyslipidemia",
    "CKD",
    "Hypothyroidism",
    "Hyperthyroidism",
    "Obesity",
  ];

  const currentClassOfMedicationsOn = [
    "Metformin",
    "Sulfonylureas",
    "DPP4",
    "SGLT2",
    "Semaglutide",
    "Insulin",
  ];

  const symptomsOfDiabetes = [
    "Increased frequency of urination",
    "increased thirst and hunger",
    "Increased tiredness",
    "Slow healing of wounds",
  ];

  const diabetesIfNotTreated = [
    "Can lead to eye problems",
    "Can lead to kidney problems",
    "Can lead to foot ulcers",
    "Can lead to heart problems",
  ];

  const lifestyleModificationRequiredForDiabeticPatients = [
    "Weight reduction",
    "Balanced diet",
    "Atleast 30 min physicial exercise daily",
    "Stopping smoking",
    "Stopping alcohol intake",
  ];

  const regularPhysicalActivity = [
    "Walking",
    "Running",
    "Yoga",
    "Aerobic",
    "Resistance / Weight training",
  ];

  const complicationsDuesToUncontrolledDiabetes = [
    "Eye problems/ Blindness",
    "Amputation",
    "Kidney disease",
    "Heart disease",
    "Neuropathy",
    "Foot Ulcers",
  ];

  const InADiabeticPatientHighBloodPressureCanIncreaseOrWorsen = [
    "Increased frequency of urination",
    "increased thirst and hunger",
    "Increased tiredness",
    "Slow healing of wounds",
  ];

  const handleSelectAll = (setFieldValue, label, value) => {
    setFieldValue(label, value);
  };

  const handleSelectNone = (setFieldValue, label) => {
    setFieldValue(label, []);
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    const bmi = calculateBmi(values.height, values.weight);
    const updatedValues = {
      ...values,
      bmi: bmi,
    };
    setTimeout(() => {
      console.log(JSON.stringify(updatedValues, null, 2));
      setSubmitting(false);
      resetForm();
    }, 400);
  };

  const calculateBmi = (height, weight) => {
    if (!height || !weight) return "";
    const bmi = weight / ((height / 100) * (height / 100));
    return bmi.toFixed(2);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, setFieldValue }) => (

        <Form>

          <div className="card m-4">
            <div className="pt-4 pb-2 ps-5 pe-5 title">
              Profiling (to be filled in by the treating doctor)
            </div>
            <hr></hr>
            <div className="p-4">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">1.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="patientID">
                        Patient ID <span className="star">*</span>
                      </label>
                      <label className="subTitle">(numerical)</label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="patientID"
                        name="patientID"
                        className="inputField"
                      />
                      <ErrorMessage name="patientID" component={TextError} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">2.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="initials">
                        Patient Initials <span className="star me-2">*</span>
                        <span className="subTitle">
                          (Enter the patient initials or first few letters of
                          the name)
                        </span>
                      </label>
                    </div>
                    <div>
                      <Field
                        type="text"
                        id="initials"
                        name="initials"
                        className="inputField"
                      />
                      <ErrorMessage name="initials" component={TextError} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">3.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="age">
                        Age <span className="star">*</span>
                      </label>
                      <label className="subTitle">
                        (Please enter age in completed years)
                      </label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="age"
                        name="age"
                        className="inputField"
                      />
                      <ErrorMessage name="age" component={TextError} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">4.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="gender">
                        Gender <span className="star">*</span>
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        as="select"
                        name="gender"
                        id="gender"
                        className="inputField"
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Field>
                      <ErrorMessage name="gender" component={TextError} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4 pt-4">
                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">5.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="height">Height (cm)</label>
                      <label className="subTitle">
                        Please enter a whole number.
                      </label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="height"
                        name="height"
                        className="inputField"
                        onChange={handleChange}
                      />
                      <ErrorMessage name="height" component={TextError} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">6.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="weight">Weight (kg)</label>
                      <label className="subTitle">
                        Please enter a whole number.
                      </label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="weight"
                        name="weight"
                        className="inputField"
                        onChange={handleChange}
                      />
                      <ErrorMessage name="weight" component={TextError} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">7.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="bmi" style={{ color: "#b4b2b2" }}>
                        BMI
                      </label>
                      <label className="subTitle">(Calculated)</label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="bmi"
                        name="bmi"
                        className="inputField"
                        value={calculateBmi(values.height, values.weight)}
                        disabled
                      />
                      <ErrorMessage name="bmi" component={TextError} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4 pt-4">
                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">8.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="city">City of Residence</label>
                      <label className="subTitle">
                        Please enter your response below.
                      </label>
                    </div>
                    <div>
                      <Field
                        type="text"
                        id="city"
                        name="city"
                        className="inputField"
                      />
                      <ErrorMessage name="city" component={TextError} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">9.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="state">State</label>
                      <label className="subTitle">Please Select One.</label>
                    </div>
                    <div>
                      <Field
                        as="select"
                        name="state"
                        id="state"
                        className="inputField"
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        <option value="Andaman Nicobar">Andaman Nicobar</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Anuranchal Pradesh">
                          Anuranchal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Himanchal Pradesh">
                          Himanchal Pradesh
                        </option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Lakshdweep">Lakshdweep</option>
                      </Field>
                      <ErrorMessage name="state" component={TextError} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">10.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="TypeofDiabetes">
                        Type of Diabetes being treated for
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        as="select"
                        name="TypeofDiabetes"
                        id="TypeofDiabetes"
                        className="inputField"
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        <option value="T1DM">T1DM</option>
                        <option value="T2DM">T2DM</option>
                        <option value="GDM">GDM</option>
                        <option value="LADA">LADA</option>
                        <option value="MODY">MODY</option>
                        <option value="Secondary Diabetes">
                          Secondary Diabetes
                        </option>
                        <option value="Other (Specify)">Other (Specify)</option>
                      </Field>
                      <ErrorMessage
                        name="TypeofDiabetes"
                        component={TextError}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">11.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="DurationofDiabetes">
                        Duration of Diabetes (years)
                      </label>
                      <label className="subTitle">
                        Please enter a Whole Number.
                      </label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="DurationofDiabetes"
                        name="DurationofDiabetes"
                        className="inputField"
                      />
                      <ErrorMessage
                        name="DurationofDiabetes"
                        component={TextError}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4 pt-4">
                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">12.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="diabetesComplications">
                        Complications due to Diabetes
                      </label>
                      <label className="subTitle">
                        Please select all that apply. If not applicable, choose
                        None at the bottom
                      </label>
                    </div>
                    {diabetesComplications.map((option) => (
                      <div key={option} className="checkBoxField">
                        <Field
                          type="checkbox"
                          name="diabetesComplications"
                          value={option}
                          id={option}
                          className="checkbox"
                          checked={values.diabetesComplications.includes(
                            option
                          )}
                        />
                        <label htmlFor={option} className="ms-2">
                          {option}
                        </label>
                      </div>
                    ))}
                    <div className="checkBoxField">
                      <Field
                        type="checkbox"
                        name="none"
                        id="none"
                        className="checkbox"
                        checked={values.diabetesComplications.length === 0}
                        onClick={() =>
                          handleSelectNone(
                            setFieldValue,
                            "diabetesComplications"
                          )
                        }
                      />
                      <label htmlFor="none" className="ms-2">
                        None
                      </label>
                    </div>
                    <div style={{ marginTop: "4.5rem" }}>
                      <label
                        htmlFor="otherdiabetesComplications"
                        className="mb-2"
                      >
                        Other:
                      </label>
                      <Field
                        type="text"
                        name="otherdiabetesComplications"
                        className="inputField"
                        value={values.otherdiabetesComplications}
                        onChange={(e) =>
                          setFieldValue(
                            "otherdiabetesComplications",
                            e.target.value
                          )
                        }
                        disabled={values.diabetesComplications.includes(
                          "Coronary Heart Disease"
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">13.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="knownMedicalConditions">
                        Known Medical conditions
                      </label>
                      <label className="subTitle">
                        Please select all that apply. If not applicable, choose
                        None at the bottom
                      </label>
                    </div>
                    {knownMedicalConditions.map((option) => (
                      <div key={option} className="checkBoxField">
                        <Field
                          type="checkbox"
                          name="knownMedicalConditions"
                          value={option}
                          id={option}
                          className="checkbox"
                          checked={values.knownMedicalConditions.includes(
                            option
                          )}
                        />
                        <label htmlFor={option} className="ms-2">
                          {option}
                        </label>
                      </div>
                    ))}
                    <div className="checkBoxField">
                      <Field
                        type="checkbox"
                        name="none"
                        id="none"
                        className="checkbox"
                        checked={values.knownMedicalConditions.length === 0}
                        onClick={() =>
                          handleSelectNone(
                            setFieldValue,
                            "knownMedicalConditions"
                          )
                        }
                      />
                      <label htmlFor="none" className="ms-2">
                        None
                      </label>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="otherKnownMedicalConditions"
                        className="mb-2"
                      >
                        Other:
                      </label>
                      <Field
                        type="text"
                        name="knownMedicalConditions"
                        className="inputField"
                        value={values.otherKnownMedicalConditions}
                        onChange={(e) =>
                          setFieldValue(
                            "otherKnownMedicalConditions",
                            e.target.value
                          )
                        }
                        disabled={values.knownMedicalConditions.includes(
                          "Coronary Heart Disease"
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">14.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="currentClassOfMedicationsOn">
                        Current class of medications on?
                      </label>
                      <label className="subTitle">
                        Please select all that apply. If not applicable, choose
                        None at the bottom
                      </label>
                    </div>
                    {currentClassOfMedicationsOn.map((option) => (
                      <div key={option} className="checkBoxField">
                        <Field
                          type="checkbox"
                          name="currentClassOfMedicationsOn"
                          value={option}
                          id={option}
                          className="checkbox"
                          checked={values.currentClassOfMedicationsOn.includes(
                            option
                          )}
                        />
                        <label htmlFor={option} className="ms-2">
                          {option}
                        </label>
                      </div>
                    ))}
                    <div className="checkBoxField">
                      <Field
                        type="checkbox"
                        name="none"
                        id="none"
                        className="checkbox"
                        checked={
                          values.currentClassOfMedicationsOn.length === 0
                        }
                        onClick={() =>
                          handleSelectNone(
                            setFieldValue,
                            "currentClassOfMedicationsOn"
                          )
                        }
                      />
                      <label htmlFor="none" className="ms-2">
                        None
                      </label>
                    </div>
                    <div className="mt-4">
                      <label
                        htmlFor="otherCurrentClassOfMedicationsOn"
                        className="mb-2"
                      >
                        Other:
                      </label>
                      <Field
                        type="text"
                        name="currentClassOfMedicationsOn"
                        className="inputField"
                        value={values.otherCurrentClassOfMedicationsOn}
                        onChange={(e) =>
                          setFieldValue(
                            "otherCurrentClassOfMedicationsOn",
                            e.target.value
                          )
                        }
                        disabled={values.currentClassOfMedicationsOn.includes(
                          "Coronary Heart Disease"
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card m-4">
            <div className="pt-4 pb-2 ps-5 pe-5 title">Key lab values</div>
            <hr></hr>
            <div className="p-4">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">15.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="rbs">RBS (mg/dL)</label>
                      <label className="subTitle">
                        Please enter a whole number.
                      </label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="rbs"
                        name="rbs"
                        className="inputField"
                      />
                      <ErrorMessage name="rbs" component={TextError} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">16.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="HbA1c">HbA1c</label>
                      <label className="subTitle">
                        Please enter a whole number.
                      </label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="HbA1c"
                        name="HbA1c"
                        className="inputField"
                      />
                      <ErrorMessage name="HbA1c" component={TextError} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">17.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="LDL">LDL (mg/dL)</label>
                      <label className="subTitle">
                        Please enter a whole number.
                      </label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="LDL"
                        name="LDL"
                        className="inputField"
                      />
                      <ErrorMessage name="LDL" component={TextError} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">18.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="HDL">HDL (mg/dl)</label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="HDL"
                        name="HDL"
                        className="inputField"
                      />
                      <ErrorMessage name="HDL" component={TextError} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4 pt-4">
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex">
                  <div className="number">19.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="eGFR"> eGFR (ml/min/1.73 m2)</label>
                      <label className="subTitle">
                        Please enter a whole number.
                      </label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="eGFR"
                        name="eGFR"
                        className="inputField"
                      />
                      <ErrorMessage name="eGFR" component={TextError} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">20.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="BloodPressureSystolic">
                        Blood Pressure Systolic(mmHg)
                      </label>
                      <label className="subTitle">
                        Please enter a whole number.
                      </label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="BloodPressureSystolic"
                        name="BloodPressureSystolic"
                        className="inputField"
                        placeholder="Systolic"
                      />
                      <ErrorMessage
                        name="BloodPressureSystolic"
                        component={TextError}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number"></div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="BloodPressureDiastolic">
                        Blood Pressure Systolic(mmHg)
                      </label>
                      <label className="subTitle">
                        Please enter a whole number.
                      </label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="BloodPressureDiastolic"
                        name="BloodPressureDiastolic"
                        className="inputField"
                        placeholder="Diastolic"
                      />
                      <ErrorMessage
                        name="BloodPressureDiastolic"
                        component={TextError}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card m-4">
            <div className="pt-4 pb-2 ps-5 pe-5 title">Current Behaviour</div>
            <hr></hr>
            <div className="p-4">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 d-flex">
                  <div className="number">21.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="FrequencyofDoctorconsult">
                        Frequency of Doctor consult
                      </label>
                      <label className="subTitle">Please Select one.</label>
                    </div>
                    <div className="row mt-5">
                      <Field
                        name="FrequencyofDoctorconsult"
                        id="FrequencyofDoctorconsult"
                      >
                        {({ field }) =>
                          frequencyOfDoctorConsultOption.map((option) => (
                            <React.Fragment key={option.value}>
                              <div className="col-lg-3 col-md-3 col-sm-12 mb-3">
                                <label
                                  htmlFor={option.value}
                                  className="radioLabel"
                                >
                                  <input
                                    type="radio"
                                    id={option.value}
                                    className="radioInput"
                                    {...field}
                                    value={option.value}
                                    checked={field.value === option.value}
                                  />
                                  <span style={{ fontSize: "16px" }}>
                                    {option.label}
                                  </span>
                                </label>
                              </div>
                            </React.Fragment>
                          ))
                        }
                      </Field>

                      <ErrorMessage
                        name="FrequencyofDoctorconsult"
                        component={TextError}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card m-4">
            <div className="pt-4 pb-2 ps-5 pe-5 title">
              About Diabetes Mellitus
            </div>
            <div className="ps-5 pe-5 title" style={{ color: "#909090" }}>
              Knowledge and Attitude
            </div>
            <hr></hr>
            <div className="p-4">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">22.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="diabetesIsAConditionInwhichTheBodyContains">
                        Diabetes is a condition in which the body contains:
                      </label>
                      <label className="subTitle">Please Select one.</label>
                    </div>
                    <div className="mt-5">
                      <Field
                        name="diabetesIsAConditionInwhichTheBodyContains"
                        id="diabetesIsAConditionInwhichTheBodyContains"
                      >
                        {({ field }) =>
                          diabetesIsAConditionInwhichTheBodyContainsOptions.map(
                            (option) => (
                              <React.Fragment key={option.value}>
                                <div className="d-flex align-items-center mb-4">
                                  <label
                                    htmlFor={option.value}
                                    className="radioLabel"
                                  >
                                    <input
                                      type="radio"
                                      id={option.value}
                                      className="radioInput"
                                      {...field}
                                      value={option.value}
                                      checked={field.value === option.value}
                                    />
                                    <span style={{ fontSize: "16px" }}>
                                      {option.label}
                                    </span>
                                  </label>
                                </div>
                              </React.Fragment>
                            )
                          )
                        }
                      </Field>

                      <ErrorMessage
                        name="FrequencyofDoctorconsult"
                        component={TextError}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">23.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="majorCauseOfDiabetesIs">
                        The major cause of diabetes is:
                      </label>
                      <label className="subTitle">Please Select one.</label>
                    </div>
                    <div className="mt-5">
                      <Field
                        name="majorCauseOfDiabetesIs"
                        id="majorCauseOfDiabetesIs"
                      >
                        {({ field }) =>
                          majorCauseOfDiabetesIsOptions.map((option) => (
                            <React.Fragment key={option.value}>
                              <div className="d-flex align-items-center mb-4">
                                <label
                                  htmlFor={option.value}
                                  className="radioLabel"
                                >
                                  <input
                                    type="radio"
                                    id={option.value}
                                    className="radioInput"
                                    {...field}
                                    value={option.value}
                                    checked={field.value === option.value}
                                  />
                                  <span style={{ fontSize: "16px" }}>
                                    {option.label}
                                  </span>
                                </label>
                              </div>
                            </React.Fragment>
                          ))
                        }
                      </Field>

                      <ErrorMessage
                        name="majorCauseOfDiabetesIs"
                        component={TextError}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">24.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="symptomsOfDiabetes">
                        The symptom(s) of diabetes is/are:
                      </label>
                      <label className="subTitle">
                        Please select all that apply. If not applicable, choose
                        None at the bottom
                      </label>
                    </div>
                    <div className="checkBoxField">
                      <Field
                        type="checkbox"
                        name="select-all"
                        id="select-all"
                        className="checkbox"
                        checked={
                          values.symptomsOfDiabetes.length ===
                          symptomsOfDiabetes.length
                        }
                        onClick={() =>
                          handleSelectAll(
                            setFieldValue,
                            "symptomsOfDiabetes",
                            symptomsOfDiabetes
                          )
                        }
                      />
                      <label htmlFor="select-all" className="ms-2">
                        All of the below
                      </label>
                    </div>
                    {symptomsOfDiabetes.map((option) => (
                      <div key={option} className="checkBoxField">
                        <Field
                          type="checkbox"
                          name="symptomsOfDiabetes"
                          value={option}
                          id={option}
                          className="checkbox"
                          checked={values.symptomsOfDiabetes.includes(option)}
                        />
                        <label htmlFor={option} className="ms-2">
                          {option}
                        </label>
                      </div>
                    ))}
                    <div className="checkBoxField">
                      <Field
                        type="checkbox"
                        name="none"
                        id="none"
                        className="checkbox"
                        checked={values.symptomsOfDiabetes.length === 0}
                        onClick={() =>
                          handleSelectNone(setFieldValue, "symptomsOfDiabetes")
                        }
                      />
                      <label htmlFor="none" className="ms-2">
                        I don't know
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row mt-5">
                  <div className="col-lg-6 col-md-6 col-sm-12 d-flex">
                    <div className="number">25.</div>
                    <div style={{ width: "100%" }}>
                      <div className="title mb-3">
                        <label htmlFor="diabetesIfNotTreated">
                          Diabetes, if not treated:
                        </label>
                        <label className="subTitle">
                          Please select all that apply. If not applicable,
                          choose "I don’t know" at the bottom
                        </label>
                      </div>
                      <div className="checkBoxField">
                        <Field
                          type="checkbox"
                          name="select-all"
                          id="select-all"
                          className="checkbox"
                          checked={
                            values.diabetesIfNotTreated.length ===
                            diabetesIfNotTreated.length
                          }
                          onClick={() =>
                            handleSelectAll(
                              setFieldValue,
                              "diabetesIfNotTreated",
                              diabetesIfNotTreated
                            )
                          }
                        />
                        <label htmlFor="select-all" className="ms-2">
                          All of the below
                        </label>
                      </div>
                      {diabetesIfNotTreated.map((option) => (
                        <div key={option} className="checkBoxField">
                          <Field
                            type="checkbox"
                            name="diabetesIfNotTreated"
                            value={option}
                            id={option}
                            className="checkbox"
                            checked={values.diabetesIfNotTreated.includes(
                              option
                            )}
                          />
                          <label htmlFor={option} className="ms-2">
                            {option}
                          </label>
                        </div>
                      ))}
                      <div className="checkBoxField">
                        <Field
                          type="checkbox"
                          name="none"
                          id="none"
                          className="checkbox"
                          checked={values.diabetesIfNotTreated.length === 0}
                          onClick={() =>
                            handleSelectNone(
                              setFieldValue,
                              "diabetesIfNotTreated"
                            )
                          }
                        />
                        <label htmlFor="none" className="ms-2">
                          I don't know
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 d-flex">
                    <div className="number">26.</div>
                    <div style={{ width: "100%" }}>
                      <div className="title mb-3">
                        <label htmlFor="lifestyleModificationRequiredForDiabeticPatients">
                          The lifestyle modification(s) required for diabetic
                          patients is / are:
                        </label>
                        <label className="subTitle">
                          Please select all that apply. If not applicable,
                          choose "I don’t know" at the bottom
                        </label>
                      </div>
                      <div className="checkBoxField">
                        <Field
                          type="checkbox"
                          name="select-all"
                          id="select-all"
                          className="checkbox"
                          checked={
                            values
                              .lifestyleModificationRequiredForDiabeticPatients
                              .length ===
                            lifestyleModificationRequiredForDiabeticPatients.length
                          }
                          onClick={() =>
                            handleSelectAll(
                              setFieldValue,
                              "lifestyleModificationRequiredForDiabeticPatients",
                              lifestyleModificationRequiredForDiabeticPatients
                            )
                          }
                        />
                        <label htmlFor="select-all" className="ms-2">
                          All of the below
                        </label>
                      </div>
                      {lifestyleModificationRequiredForDiabeticPatients.map(
                        (option) => (
                          <div key={option} className="checkBoxField">
                            <Field
                              type="checkbox"
                              name="lifestyleModificationRequiredForDiabeticPatients"
                              value={option}
                              id={option}
                              className="checkbox"
                              checked={values.lifestyleModificationRequiredForDiabeticPatients.includes(
                                option
                              )}
                            />
                            <label htmlFor={option} className="ms-2">
                              {option}
                            </label>
                          </div>
                        )
                      )}
                      <div className="checkBoxField">
                        <Field
                          type="checkbox"
                          name="none"
                          id="none"
                          className="checkbox"
                          checked={
                            values
                              .lifestyleModificationRequiredForDiabeticPatients
                              .length === 0
                          }
                          onClick={() =>
                            handleSelectNone(
                              setFieldValue,
                              "lifestyleModificationRequiredForDiabeticPatients"
                            )
                          }
                        />
                        <label htmlFor="none" className="ms-2">
                          I don't know
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card m-4">
            <div className="pt-4 pb-2 ps-5 pe-5 title">Diet</div>
            <hr></hr>
            <div className="p-4">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">27.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="haveYouReceivedDietCounselling">
                        Have you received diet counselling
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        as="select"
                        name="haveYouReceivedDietCounselling"
                        id="haveYouReceivedDietCounselling"
                        className="inputField"
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        <option value="None">None</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Dietecien">Dietecien</option>
                        <option value="Family Member/ Friends">
                          Family Member/ Friends
                        </option>
                        <option value="Online">Online</option>
                      </Field>
                      <ErrorMessage
                        name="haveYouReceivedDietCounselling"
                        component={TextError}
                      />
                    </div>
                    <div className="mt-4">
                      <label htmlFor="otherDietCounselling" className="mb-2">
                        Other:
                      </label>
                      <Field
                        type="text"
                        name="haveYouReceivedDietCounselling"
                        className="inputField"
                        value={values.otherDietCounselling}
                        onChange={(e) =>
                          setFieldValue("otherDietCounselling", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">28.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="noOfDiet">
                        Number of meals in a day <span className="star">*</span>
                      </label>
                      <label className="subTitle">
                        Please Enter a whole number
                      </label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="noOfDiet"
                        name="noOfDiet"
                        className="inputField"
                      />
                      <ErrorMessage name="noOfDiet" component={TextError} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">29.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="noOfSnacks">
                        Number of snacks per day <span className="star">*</span>
                      </label>
                      <label className="subTitle">
                        Please Enter a whole number
                      </label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="noOfSnacks"
                        name="noOfSnacks"
                        className="inputField"
                      />
                      <ErrorMessage name="noOfSnacks" component={TextError} />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">30.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="dietType">Diet type</label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        as="select"
                        name="dietType"
                        id="dietType"
                        className="inputField"
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        <option value="Purely Vegetarian">
                          Purely Vegetarian
                        </option>
                        <option value="Dairy Free Diet">
                          Dairy Free Diet (No Milk Products)
                        </option>
                        <option value="Eggitarian">
                          Eggitarian (no meats but eggs)
                        </option>
                        <option value="mixed">Mixed (Veg + Non-Veg)</option>
                      </Field>
                      <ErrorMessage name="dietType" component={TextError} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">31.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="doYouHaveBreakfastRegularly?">
                        Do you have breakfast regularly?
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        as="select"
                        name="doYouHaveBreakfastRegularly"
                        id="doYouHaveBreakfastRegularly"
                        className="inputField"
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </Field>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">32.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="whatTimeDoYouHaveDinner">
                        What time do you have dinner
                      </label>
                      <label className="subTitle">Please Select Time</label>
                    </div>
                    <div>
                      <Field
                        type="text"
                        id="whatTimeDoYouHaveDinner"
                        name="whatTimeDoYouHaveDinner"
                        className="inputField"
                      />
                      <ErrorMessage
                        name="whatTimeDoYouHaveDinner"
                        component={TextError}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">33.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="howWouldYouClassifyYourAppetite">
                        How would you classify your appetite
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        as="select"
                        name="howWouldYouClassifyYourAppetite"
                        id="howWouldYouClassifyYourAppetite"
                        className="inputField"
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        <option value="Normal">Normal</option>
                        <option value="Poor">Poor</option>
                        <option value="Excessive">Excessive</option>
                      </Field>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">34.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="InTheLast7DaysOnHowManyDaysHaveYouFollowedAHealthyEatingPlan">
                        In the last 7 days on how many days have you followed a
                        healthy eating plan
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        as="select"
                        name="InTheLast7DaysOnHowManyDaysHaveYouFollowedAHealthyEatingPlan"
                        id="InTheLast7DaysOnHowManyDaysHaveYouFollowedAHealthyEatingPlan"
                        className="inputField"
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card m-4">
            <div className="pt-4 pb-2 ps-5 pe-5 title">Physical Activity</div>
            <hr></hr>
            <div className="p-4">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">35.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="regularPhysicalActivity">
                        What forms of activity do you undertake regularly?
                      </label>
                      <label className="subTitle">
                        Please select all that apply. If not applicable, choose
                        None at the bottom
                      </label>
                    </div>
                    {regularPhysicalActivity.map((option) => (
                      <div key={option} className="checkBoxField">
                        <Field
                          type="checkbox"
                          name="regularPhysicalActivity"
                          value={option}
                          id={option}
                          className="checkbox"
                          checked={values.regularPhysicalActivity.includes(
                            option
                          )}
                        />
                        <label htmlFor={option} className="ms-2">
                          {option}
                        </label>
                      </div>
                    ))}
                    <div className="checkBoxField">
                      <Field
                        type="checkbox"
                        name="none"
                        id="none"
                        className="checkbox"
                        checked={values.regularPhysicalActivity.length === 0}
                        onClick={() =>
                          handleSelectNone(
                            setFieldValue,
                            "regularPhysicalActivity"
                          )
                        }
                      />
                      <label htmlFor="none" className="ms-2">
                        None
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">36.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="hoursOfExerciseInLastSevenDays">
                        How many hours did you exercise in the last 7 days?
                      </label>
                      <label className="subTitle">
                        Please Enter a whole number
                      </label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="hoursOfExerciseInLastSevenDays"
                        name="hoursOfExerciseInLastSevenDays"
                        className="inputField"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">37.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="participationInAtleastThirtyMinutesPhyActivity">
                        On how many of the last SEVEN DAYS did you participate
                        in at least 30 minutes of physical activity? (Total
                        minutes of continuous activity, including walking).
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        as="select"
                        name="participationInAtleastThirtyMinutesPhyActivity"
                        id="participationInAtleastThirtyMinutesPhyActivity"
                        className="inputField"
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                      </Field>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 mt-4 d-flex">
                  <div className="number">38.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="hoursOfSleep">
                        How many hours of sleep do you typically get in a day?
                      </label>
                      <label className="subTitle">
                        Please Enter a whole number
                      </label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="hoursOfSleep"
                        name="hoursOfSleep"
                        className="inputField"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-lg-12 col-md-12 col-sm-12 mt-4 d-flex">                  
                  <div className="number">39.</div>

                  <div style={{ width: "100%" }}>
                    <div className="title mb-2">
                      <label>
                        Please answer the below questions regarding your sleep
                      </label>
                      <label className="subTitle">
                        Please select one option for each row.
                      </label>
                    </div>

                    <hr></hr>

                    <div className="desktopHeading mb-5 mt-4">
                      <div className="col-lg-4 col-md-4 col-sm-12 d-flex"></div>
                      <div className="col-lg-2 col-md-2 col-sm-12 d-flex align-items-center justify-content-center title">
                        Always
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-12 d-flex align-items-center justify-content-center title">
                        Often
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-12 d-flex align-items-center justify-content-center title">
                        Sometiemes
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-12 d-flex align-items-center justify-content-center title">
                        Rarely
                      </div>
                    </div>

                    <div className="row d-flex">
                      <div className="col-lg-4 col-md-4 col-sm-12 title mb-3">
                        <label htmlFor="usuallySleepAroundSameTimeEveryday">
                          I usually go to sleep around the same time everyday
                        </label>
                      </div>      
                          <Field
                            name="usuallySleepAroundSameTimeEveryday"
                            id="usuallySleepAroundSameTimeEveryday"
                          >
                            {({ field }) =>
                              usuallySleepAroundSameTimeEveryday.map(
                                (option) => (
                                  <React.Fragment key={option.value}>
                                    <div className="col-lg-2 col-md-2 col-sm-12 d-flex align-items-center justify-content-center mb-3">
                                      <label
                                        htmlFor={option.value}
                                        className="radioLabel"
                                      >
                                        <input
                                          type="radio"
                                          id={option.value}
                                          className="radioInput"
                                          {...field}
                                          value={option.value}
                                          checked={field.value === option.value}
                                        />
                                        <span className="checkboxLabel">
                                          {option.label}
                                        </span>
                                      </label>
                                    </div>
                                  </React.Fragment>
                                )
                              )
                            }
                          </Field>
                      
                
                    </div>

                    <div className="row d-flex">
                      <div className="col-lg-4 col-md-4 col-sm-12 title mb-3">
                        <label htmlFor="satisfiedWithSleep">
                          I am satisfied with my sleep
                        </label>
                      </div>

                          <Field
                            name="satisfiedWithSleep"
                            id="satisfiedWithSleep"
                          >
                            {({ field }) =>
                              usuallySleepAroundSameTimeEveryday.map(
                                (option) => (
                                  <React.Fragment key={option.value}>
                                    <div className="col-lg-2 col-md-2 col-sm-12 d-flex align-items-center justify-content-center mb-3">
                                      <label
                                        htmlFor={option.value}
                                        className="radioLabel"
                                      >
                                        <input
                                          type="radio"
                                          id={option.value}
                                          className="radioInput"
                                          {...field}
                                          value={option.value}
                                          checked={field.value === option.value}
                                        />
                                        <span className="checkboxLabel">
                                          {option.label}
                                        </span>
                                      </label>
                                    </div>
                                  </React.Fragment>
                                )
                              )
                            }
                          </Field>
                    
              
                    </div>

                    <div className="row d-flex">
                      <div className="col-lg-4 col-md-4 col-sm-12 title mb-3">
                        <label htmlFor="difficultyFallingAsleep">
                          I have difficulty falling asleep
                        </label>
                      </div>
                      
                          <Field
                            name="difficultyFallingAsleep"
                            id="difficultyFallingAsleep"
                          >
                            {({ field }) =>
                              usuallySleepAroundSameTimeEveryday.map(
                                (option) => (
                                  <React.Fragment key={option.value}>
                                    <div className="col-lg-2 col-md-2 col-sm-12 d-flex align-items-center justify-content-center mb-3">
                                      <label
                                        htmlFor={option.value}
                                        className="radioLabel"
                                      >
                                        <input
                                          type="radio"
                                          id={option.value}
                                          className="radioInput"
                                          {...field}
                                          value={option.value}
                                          checked={field.value === option.value}
                                        />
                                        <span className="checkboxLabel">
                                          {option.label}
                                        </span>
                                      </label>
                                    </div>
                                  </React.Fragment>
                                )
                              )
                            }
                          </Field>
                       
                    </div>

                    <div className="row d-flex">
                      <div className="col-lg-4 col-md-4 col-sm-12 title mb-3">
                        <label htmlFor="feelRefreshAfterSleep">
                          I feel refreshed after sleep
                        </label>
                      </div>

                    
                          <Field
                            name="feelRefreshAfterSleep"
                            id="feelRefreshAfterSleep"
                          >
                            {({ field }) =>
                              usuallySleepAroundSameTimeEveryday.map(
                                (option) => (
                                  <React.Fragment key={option.value}>
                                    <div className="col-lg-2 col-md-2 col-sm-12 d-flex align-items-center justify-content-center mb-3">
                                      <label
                                        htmlFor={option.value}
                                        className="radioLabel"
                                      >
                                        <input
                                          type="radio"
                                          id={option.value}
                                          className="radioInput"
                                          {...field}
                                          value={option.value}
                                          checked={field.value === option.value}
                                        />
                                        <span className="checkboxLabel">
                                          {option.label}
                                        </span>
                                      </label>
                                    </div>
                                  </React.Fragment>
                                )
                              )
                            }
                          </Field>
                    
                  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card m-4">
            <div className="pt-4 pb-2 ps-5 pe-5 title">Habits</div>
            <hr></hr>
            <div className="p-4">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex">
                  <div className="number">40.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="alcoholComsuption">
                        How often do you consume Alcohol ?
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <Field name="alcoholComsuption" id="alcoholComsuption">
                      {({ field }) =>
                        AlcoholComsuption.map((option) => (
                          <React.Fragment key={option.value}>
                            <div className=" mb-3">
                              <label
                                htmlFor={option.value}
                                className="radioLabel"
                              >
                                <input
                                  type="radio"
                                  id={option.value}
                                  className="radioInput"
                                  {...field}
                                  value={option.value}
                                  checked={field.value === option.value}
                                />
                                <span style={{ fontSize: "16px" }}>
                                  {option.label}
                                </span>
                              </label>
                            </div>
                          </React.Fragment>
                        ))
                      }
                    </Field>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 d-flex">
                  <div className="number">41.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="smoked">
                        In the last 7 days have you smoked (even if 1 puff)
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <Field name="smoked" id="smoked">
                      {({ field }) =>
                        smoked.map((option) => (
                          <React.Fragment key={option.value}>
                            <div className=" mb-3">
                              <label
                                htmlFor={option.value}
                                className="radioLabel"
                              >
                                <input
                                  type="radio"
                                  id={option.value}
                                  className="radioInput"
                                  {...field}
                                  value={option.value}
                                  checked={field.value === option.value}
                                />
                                <span style={{ fontSize: "16px" }}>
                                  {option.label}
                                </span>
                              </label>
                            </div>
                          </React.Fragment>
                        ))
                      }
                    </Field>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card m-4">
            <div className="pt-4 pb-2 ps-5 pe-5 title">Medications</div>
            <hr></hr>
            <div className="p-4">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">42.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="diabeticMedication">
                        Do you miss taking the doses of your diabetic
                        medication?
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <Field name="diabeticMedication" id="diabeticMedication">
                      {({ field }) =>
                        smoked.map((option) => (
                          <React.Fragment key={option.value}>
                            <div className=" mb-3">
                              <label
                                htmlFor={option.value}
                                className="radioLabel"
                              >
                                <input
                                  type="radio"
                                  id={option.value}
                                  className="radioInput"
                                  {...field}
                                  value={option.value}
                                  checked={field.value === option.value}
                                />
                                <span style={{ fontSize: "16px" }}>
                                  {option.label}
                                </span>
                              </label>
                            </div>
                          </React.Fragment>
                        ))
                      }
                    </Field>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">43.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="noOfDaysOfTakingDiabeticMedications">
                        In the last 7 days on how many days did you take your
                        diabetes medications as prescribed by the doctor
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <Field
                      name="noOfDaysOfTakingDiabeticMedications"
                      id="noOfDaysOfTakingDiabeticMedications"
                    >
                      {({ field }) =>
                        noOfDaysOfTakingDiabeticMedications.map((option) => (
                          <React.Fragment key={option.value}>
                            <div className=" mb-3">
                              <label
                                htmlFor={option.value}
                                className="radioLabel"
                              >
                                <input
                                  type="radio"
                                  id={option.value}
                                  className="radioInput"
                                  {...field}
                                  value={option.value}
                                  checked={field.value === option.value}
                                />
                                <span style={{ fontSize: "16px" }}>
                                  {option.label}
                                </span>
                              </label>
                            </div>
                          </React.Fragment>
                        ))
                      }
                    </Field>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">44.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="uponControlOfDiabetesTheMedicines">
                        Upon control of Diabetes the medicines
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <Field
                      name="uponControlOfDiabetesTheMedicines"
                      id="uponControlOfDiabetesTheMedicines"
                    >
                      {({ field }) =>
                        uponControlOfDiabetesTheMedicines.map((option) => (
                          <React.Fragment key={option.value}>
                            <div className=" mb-3">
                              <label
                                htmlFor={option.value}
                                className="radioLabel"
                              >
                                <input
                                  type="radio"
                                  id={option.value}
                                  className="radioInput"
                                  {...field}
                                  value={option.value}
                                  checked={field.value === option.value}
                                />
                                <span style={{ fontSize: "16px" }}>
                                  {option.label}
                                </span>
                              </label>
                            </div>
                          </React.Fragment>
                        ))
                      }
                    </Field>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card m-4">
            <div className="pt-4 pb-2 ps-5 pe-5 title">Self monitoring</div>
            <hr></hr>
            <div className="p-4">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex">
                  <div className="number">45.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="glucometer">
                        Do you have a Glucometer and use the same to regularly
                        monitor blood glucose at home / place of work
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        as="select"
                        name="glucometer"
                        id="glucometer"
                        className="inputField"
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        <option value="No, do not have Glucometer">
                          No, do not have Glucometer
                        </option>
                        <option value="Have Glucometer, but rarely to use it">
                          Have Glucometer, but rarely to use it
                        </option>
                        <option value="Have Glucometer, but use it sometimes , when needed">
                          Have Glucometer, but use it sometimes , when needed
                        </option>
                        <option value="Have Glucometer, and use it regularly i.e. atleast few times a week">
                          Have Glucometer, and use it regularly i.e. atleast few
                          times a week
                        </option>
                      </Field>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 d-flex">
                  <div className="number">46.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="bloodPressureMonitoringDevice">
                        Do you have a Blood Pressure monitoring device and use
                        the same to regularly monitor BP at home / place of work
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        as="select"
                        name="bloodPressureMonitoringDevice"
                        id="bloodPressureMonitoringDevice"
                        className="inputField"
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        <option value="No, do not have BP Monitoring Device">
                          No, do not have BP Monitoring Device
                        </option>
                        <option value="Have Device, but rarely to use it">
                          Have Device, but rarely to use it
                        </option>
                        <option value="Have Device, but use it sometimes , when needed">
                          Have Device, but use it sometimes , when needed
                        </option>
                        <option value="Have Device, and use it regularly i.e. atleast few times a week">
                          Have Device, and use it regularly i.e. atleast few
                          times a week
                        </option>
                      </Field>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex">
                  <div className="number">47.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="inHowManyOfTheLast7DaysDidYouTestYourBloodSugar">
                        On how many of the last 7 days did you test your blood
                        sugar
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        as="select"
                        name="inHowManyOfTheLast7DaysDidYouTestYourBloodSugar"
                        id="inHowManyOfTheLast7DaysDidYouTestYourBloodSugar"
                        className="inputField"
                      >
                        <option value="" disabled>
                          Tap to rate here.
                        </option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                      </Field>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 d-flex">
                  <div className="number">48.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="inHowManyOfTheLast7DaysDidYouTestYourBloodPressure">
                        On how many of the last 7 days did you test your Blood
                        pressure (BP)
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        as="select"
                        name="inHowManyOfTheLast7DaysDidYouTestYourBloodPressure"
                        id="inHowManyOfTheLast7DaysDidYouTestYourBloodPressure"
                        className="inputField"
                      >
                        <option value="" disabled>
                          Tap to rate here.
                        </option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                      </Field>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-lg-6 col-md-6 col-sm-12 d-flex">
                  <div className="number">49.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="bloodSugarCheckedLast">
                        When was your blood sugar checked last?
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        as="select"
                        name="bloodSugarCheckedLast"
                        id="bloodSugarCheckedLast"
                        className="inputField"
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        <option value="One week ago">One week ago</option>
                        <option value="One month ago">One month ago</option>
                        <option value="Two months ago">Two months ago</option>
                        <option value="Six months ago">Six months ago</option>
                        <option value="One year ago">One year ago</option>
                      </Field>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 d-flex">
                  <div className="number">50.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="bloodPressureCheckedLast">
                        When was your blood pressure checked last?
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        as="select"
                        name="bloodPressureCheckedLast"
                        id="bloodPressureCheckedLast"
                        className="inputField"
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        <option value="One week ago">One week ago</option>
                        <option value="One month ago">One month ago</option>
                        <option value="Two months ago">Two months ago</option>
                        <option value="Six months ago">Six months ago</option>
                        <option value="One year ago">One year ago</option>
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card m-4">
            <div className="pt-4 pb-2 ps-5 pe-5 title">Complications</div>
            <hr></hr>
            <div className="p-4">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">51.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="educatedAboutUncontrolledDiabetes">
                        Have you been educated about the complications that can
                        arise due to uncontrolled Diabetes?
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        name="educatedAboutUncontrolledDiabetes"
                        id="educatedAboutUncontrolledDiabetes"
                      >
                        {({ field }) =>
                          educatedAboutUncontrolledDiabetes.map((option) => (
                            <React.Fragment key={option.value}>
                              <div className=" mb-3">
                                <label
                                  htmlFor={option.value}
                                  className="radioLabel"
                                >
                                  <input
                                    type="radio"
                                    id={option.value}
                                    className="radioInput"
                                    {...field}
                                    value={option.value}
                                    checked={field.value === option.value}
                                  />
                                  <span style={{ fontSize: "16px" }}>
                                    {option.label}
                                  </span>
                                </label>
                              </div>
                            </React.Fragment>
                          ))
                        }
                      </Field>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">52.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="complicationsDuesToUncontrolledDiabetes">
                        Which according to you are complications dues to
                        uncontrolled diabetes
                      </label>
                      <label className="subTitle">
                        Please select all that apply. If not applicable, choose
                        "I don’t know" at the bottom
                      </label>
                    </div>
                    {complicationsDuesToUncontrolledDiabetes.map((option) => (
                      <div key={option} className="checkBoxField">
                        <Field
                          type="checkbox"
                          name="complicationsDuesToUncontrolledDiabetes"
                          value={option}
                          id={option}
                          className="checkbox"
                          checked={values.regularPhysicalActivity.includes(
                            option
                          )}
                        />
                        <label htmlFor={option} className="ms-2">
                          {option}
                        </label>
                      </div>
                    ))}
                    <div className="checkBoxField">
                      <Field
                        type="checkbox"
                        name="none"
                        id="none"
                        className="checkbox"
                        checked={
                          values.complicationsDuesToUncontrolledDiabetes
                            .length === 0
                        }
                        onClick={() =>
                          handleSelectNone(
                            setFieldValue,
                            "complicationsDuesToUncontrolledDiabetes"
                          )
                        }
                      />
                      <label htmlFor="none" className="ms-2">
                        I Don't Know
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">52.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="InADiabeticPatientHighBloodPressureCanIncreaseOrWorsen">
                        In a diabetic patient, high blood pressure can increase
                        or worsen
                      </label>
                      <label className="subTitle">
                        Please select all that apply. If not applicable, choose
                        "I don’t know" at the bottom
                      </label>
                    </div>
                    <div className="checkBoxField">
                      <Field
                        type="checkbox"
                        name="select-all"
                        id="select-all"
                        className="checkbox"
                        checked={
                          values
                            .InADiabeticPatientHighBloodPressureCanIncreaseOrWorsen
                            .length ===
                          InADiabeticPatientHighBloodPressureCanIncreaseOrWorsen.length
                        }
                        onClick={() =>
                          handleSelectAll(
                            setFieldValue,
                            "InADiabeticPatientHighBloodPressureCanIncreaseOrWorsen",
                            InADiabeticPatientHighBloodPressureCanIncreaseOrWorsen
                          )
                        }
                      />
                      <label htmlFor="select-all" className="ms-2">
                        All of the below
                      </label>
                    </div>
                    {symptomsOfDiabetes.map((option) => (
                      <div key={option} className="checkBoxField">
                        <Field
                          type="checkbox"
                          name="InADiabeticPatientHighBloodPressureCanIncreaseOrWorsen"
                          value={option}
                          id={option}
                          className="checkbox"
                          checked={values.InADiabeticPatientHighBloodPressureCanIncreaseOrWorsen.includes(
                            option
                          )}
                        />
                        <label htmlFor={option} className="ms-2">
                          {option}
                        </label>
                      </div>
                    ))}
                    <div className="checkBoxField">
                      <Field
                        type="checkbox"
                        name="none"
                        id="none"
                        className="checkbox"
                        checked={
                          values
                            .InADiabeticPatientHighBloodPressureCanIncreaseOrWorsen
                            .length === 0
                        }
                        onClick={() =>
                          handleSelectNone(
                            setFieldValue,
                            "InADiabeticPatientHighBloodPressureCanIncreaseOrWorsen"
                          )
                        }
                      />
                      <label htmlFor="none" className="ms-2">
                        I don't know
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-12 d-flex">
                  <div className="number">53.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="inTheLast1WeekHowManyTimesDidYouCheckYourFeet">
                        In the last 1 week how many times did you check your
                        feet
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        as="select"
                        name="inTheLast1WeekHowManyTimesDidYouCheckYourFeet"
                        id="inTheLast1WeekHowManyTimesDidYouCheckYourFeet"
                        className="inputField"
                      >
                        <option value="" disabled>
                          Tap to rate here.
                        </option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                      </Field>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">54.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="inTheLast1WeekHowManyTimesDidYouWashYourFeet">
                        In the last 1 week how many times did you wash your feet
                        ?
                      </label>
                      <label className="subTitle">
                        Please Enter a whole number
                      </label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="inTheLast1WeekHowManyTimesDidYouWashYourFeet"
                        name="inTheLast1WeekHowManyTimesDidYouWashYourFeet"
                        className="inputField"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">55.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="AreYouAwareOfBloodSugarLevelsFallingBelowNormalWhenYouAreTakingMedicines?">
                        Are you aware of blood sugar levels falling below normal
                        when you are taking medicines?
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <Field
                      name="AreYouAwareOfBloodSugarLevelsFallingBelowNormalWhenYouAreTakingMedicines"
                      id="AreYouAwareOfBloodSugarLevelsFallingBelowNormalWhenYouAreTakingMedicines"
                    >
                      {({ field }) =>
                        AreYouAwareOfBloodSugarLevelsFallingBelowNormalWhenYouAreTakingMedicines.map(
                          (option) => (
                            <React.Fragment key={option.value}>
                              <div className=" mb-3">
                                <label
                                  htmlFor={option.value}
                                  className="radioLabel"
                                >
                                  <input
                                    type="radio"
                                    id={option.value}
                                    className="radioInput"
                                    {...field}
                                    value={option.value}
                                    checked={field.value === option.value}
                                  />
                                  <span style={{ fontSize: "16px" }}>
                                    {option.label}
                                  </span>
                                </label>
                              </div>
                            </React.Fragment>
                          )
                        )
                      }
                    </Field>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">56.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="howDoYouManageHypoglycemicSymptoms?">
                        How do you manage hypoglycemic symptoms?
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <Field
                      name="howDoYouManageHypoglycemicSymptoms"
                      id="howDoYouManageHypoglycemicSymptoms"
                    >
                      {({ field }) =>
                        howDoYouManageHypoglycemicSymptoms.map((option) => (
                          <React.Fragment key={option.value}>
                            <div className=" mb-3">
                              <label
                                htmlFor={option.value}
                                className="radioLabel"
                              >
                                <input
                                  type="radio"
                                  id={option.value}
                                  className="radioInput"
                                  {...field}
                                  value={option.value}
                                  checked={field.value === option.value}
                                />
                                <span style={{ fontSize: "16px" }}>
                                  {option.label}
                                </span>
                              </label>
                            </div>
                          </React.Fragment>
                        ))
                      }
                    </Field>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card m-4">
            <div className="pt-4 pb-2 ps-5 pe-5 title">Attitude</div>
            <hr></hr>
            <div className="p-4">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">35.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="regularPhysicalActivity">
                        What forms of activity do you undertake regularly?
                      </label>
                      <label className="subTitle">
                        Please select all that apply. If not applicable, choose
                        None at the bottom
                      </label>
                    </div>
                    {regularPhysicalActivity.map((option) => (
                      <div key={option} className="checkBoxField">
                        <Field
                          type="checkbox"
                          name="regularPhysicalActivity"
                          value={option}
                          id={option}
                          className="checkbox"
                          checked={values.regularPhysicalActivity.includes(
                            option
                          )}
                        />
                        <label htmlFor={option} className="ms-2">
                          {option}
                        </label>
                      </div>
                    ))}
                    <div className="checkBoxField">
                      <Field
                        type="checkbox"
                        name="none"
                        id="none"
                        className="checkbox"
                        checked={values.regularPhysicalActivity.length === 0}
                        onClick={() =>
                          handleSelectNone(
                            setFieldValue,
                            "regularPhysicalActivity"
                          )
                        }
                      />
                      <label htmlFor="none" className="ms-2">
                        None
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">36.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="hoursOfExerciseInLastSevenDays">
                        How many hours did you exercise in the last 7 days?
                      </label>
                      <label className="subTitle">
                        Please Enter a whole number
                      </label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="hoursOfExerciseInLastSevenDays"
                        name="hoursOfExerciseInLastSevenDays"
                        className="inputField"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-4 col-sm-12 d-flex">
                  <div className="number">37.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="participationInAtleastThirtyMinutesPhyActivity">
                        On how many of the last SEVEN DAYS did you participate
                        in at least 30 minutes of physical activity? (Total
                        minutes of continuous activity, including walking).
                      </label>
                      <label className="subTitle">Please select one.</label>
                    </div>
                    <div>
                      <Field
                        as="select"
                        name="participationInAtleastThirtyMinutesPhyActivity"
                        id="participationInAtleastThirtyMinutesPhyActivity"
                        className="inputField"
                      >
                        <option value="" disabled>
                          Select...
                        </option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                      </Field>
                    </div>
                  </div>
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 mt-4 d-flex">
                  <div className="number">38.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-3">
                      <label htmlFor="hoursOfSleep">
                        How many hours of sleep do you typically get in a day?
                      </label>
                      <label className="subTitle">
                        Please Enter a whole number
                      </label>
                    </div>
                    <div>
                      <Field
                        type="number"
                        id="hoursOfSleep"
                        name="hoursOfSleep"
                        className="inputField"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-3">
                <div className="col-lg-12 col-md-12 col-sm-12 mt-4 d-flex">
                  <div className="number">57.</div>
                  <div style={{ width: "100%" }}>
                    <div className="title mb-2">
                      <label>
                        I am listing here some factors that many people have
                        mentioned as important to manage diabetes. According to
                        you how important are they on a 10 point scale where 10
                        means very important and 1 means Not at all important
                      </label>
                      <label className="subTitle">
                        Please select one option for each row.
                      </label>
                    </div>
                    <hr></hr>
                    <div className="desktopHeading mb-5 mt-4">
                      <div className="col-lg-2 col-md-2 col-sm-12 d-flex"></div>
                      <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center title">
                        10 - Very important
                      </div>
                      <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center title">
                        9
                      </div>
                      <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center title">
                        8
                      </div>
                      <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center title">
                        7
                      </div>
                      <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center title">
                        6
                      </div>
                      <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center title">
                        5
                      </div>
                      <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center title">
                        4
                      </div>
                      <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center title">
                        3
                      </div>
                      <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center title">
                        2
                      </div>
                      <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center title">
                        1 - Not at all important
                      </div>
                    </div>
                    <div className="row d-flex">
                      <div className="col-lg-2 col-md-2 col-sm-12 title mb-3">
                        <label htmlFor="consultingDoctorRegularly">
                          Consulting doctor regularly
                        </label>
                      </div>

                      <Field
                        name="consultingDoctorRegularly"
                        id="consultingDoctorRegularly"
                      >
                        {({ field }) =>
                          consultingDoctorRegularly.map((option) => (
                            <React.Fragment key={option.value}>
                              <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center mb-3">
                                <label
                                  htmlFor={option.value}
                                  className="radioLabel"
                                >
                                  <input
                                    type="radio"
                                    id={option.value}
                                    className="radioInput"
                                    {...field}
                                    value={option.value}
                                    checked={field.value === option.value}
                                  />
                                  <span className="checkboxLabel">
                                    {option.label}
                                  </span>
                                </label>
                              </div>
                            </React.Fragment>
                          ))
                        }
                      </Field>
                    </div>

                    <div className="row d-flex">
                      <div className="col-lg-2 col-md-2 col-sm-12 title mb-3">
                        <label htmlFor="qualitySleepEveryday">
                        Quality sleep everyday
                        </label>
                      </div>

                      <Field
                        name="qualitySleepEveryday"
                        id="qualitySleepEveryday"
                      >
                        {({ field }) =>
                          consultingDoctorRegularly.map((option) => (
                            <React.Fragment key={option.value}>
                              <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center mb-3">
                                <label
                                  htmlFor={option.value}
                                  className="radioLabel"
                                >
                                  <input
                                    type="radio"
                                    id={option.value}
                                    className="radioInput"
                                    {...field}
                                    value={option.value}
                                    checked={field.value === option.value}
                                  />
                                  <span className="checkboxLabel">
                                    {option.label}
                                  </span>
                                </label>
                              </div>
                            </React.Fragment>
                          ))
                        }
                      </Field>
                    </div>

                    <div className="row d-flex">
                      <div className="col-lg-2 col-md-2 col-sm-12 title mb-3">
                        <label htmlFor="haveRoutineForDayToDayActivities">
                        Have a routine for day to day activities
                        </label>
                      </div>

                      <Field
                        name="haveRoutineForDayToDayActivities"
                        id="haveRoutineForDayToDayActivities"
                      >
                        {({ field }) =>
                          consultingDoctorRegularly.map((option) => (
                            <React.Fragment key={option.value}>
                              <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center mb-3">
                                <label
                                  htmlFor={option.value}
                                  className="radioLabel"
                                >
                                  <input
                                    type="radio"
                                    id={option.value}
                                    className="radioInput"
                                    {...field}
                                    value={option.value}
                                    checked={field.value === option.value}
                                  />
                                  <span className="checkboxLabel">
                                    {option.label}
                                  </span>
                                </label>
                              </div>
                            </React.Fragment>
                          ))
                        }
                      </Field>
                    </div>

                    
                    <div className="row d-flex">
                      <div className="col-lg-2 col-md-2 col-sm-12 title mb-3">
                        <label htmlFor="haveBodyWeightUnderControl">
                          Have body weight under control
                        </label>
                      </div>

                      <Field
                        name="haveBodyWeightUnderControl"
                        id="haveBodyWeightUnderControl"
                      >
                        {({ field }) =>
                          consultingDoctorRegularly.map((option) => (
                            <React.Fragment key={option.value}>
                              <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center mb-3">
                                <label
                                  htmlFor={option.value}
                                  className="radioLabel"
                                >
                                  <input
                                    type="radio"
                                    id={option.value}
                                    className="radioInput"
                                    {...field}
                                    value={option.value}
                                    checked={field.value === option.value}
                                  />
                                  <span className="checkboxLabel">
                                    {option.label}
                                  </span>
                                </label>
                              </div>
                            </React.Fragment>
                          ))
                        }
                      </Field>
                    </div>
                   
                    <div className="row d-flex">
                      <div className="col-lg-2 col-md-2 col-sm-12 title mb-3">
                        <label htmlFor="haveQualityDiet">
                         Have quality diet
                        </label>
                      </div>

                      <Field
                        name="haveQualityDiet"
                        id="haveQualityDiet"
                      >
                        {({ field }) =>
                          consultingDoctorRegularly.map((option) => (
                            <React.Fragment key={option.value}>
                              <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center mb-3">
                                <label
                                  htmlFor={option.value}
                                  className="radioLabel"
                                >
                                  <input
                                    type="radio"
                                    id={option.value}
                                    className="radioInput"
                                    {...field}
                                    value={option.value}
                                    checked={field.value === option.value}
                                  />
                                  <span className="checkboxLabel">
                                    {option.label}
                                  </span>
                                </label>
                              </div>
                            </React.Fragment>
                          ))
                        }
                      </Field>
                    </div>

                    <div className="row d-flex">
                      <div className="col-lg-2 col-md-2 col-sm-12 title mb-3">
                        <label htmlFor="controlTheQuantityOfFood">
                         Control the quantity of food
                        </label>
                      </div>

                      <Field
                        name="controlTheQuantityOfFood"
                        id="controlTheQuantityOfFood"
                      >
                        {({ field }) =>
                          consultingDoctorRegularly.map((option) => (
                            <React.Fragment key={option.value}>
                              <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center mb-3">
                                <label
                                  htmlFor={option.value}
                                  className="radioLabel"
                                >
                                  <input
                                    type="radio"
                                    id={option.value}
                                    className="radioInput"
                                    {...field}
                                    value={option.value}
                                    checked={field.value === option.value}
                                  />
                                  <span className="checkboxLabel">
                                    {option.label}
                                  </span>
                                </label>
                              </div>
                            </React.Fragment>
                          ))
                        }
                      </Field>
                    </div>

                    <div className="row d-flex">
                      <div className="col-lg-2 col-md-2 col-sm-12 title mb-3">
                        <label htmlFor="takingMedicationsAsDirectedByDoctor">
                        Taking medications as directed by doctor
                        </label>
                      </div>

                      <Field
                        name="takingMedicationsAsDirectedByDoctor"
                        id="takingMedicationsAsDirectedByDoctor"
                      >
                        {({ field }) =>
                          consultingDoctorRegularly.map((option) => (
                            <React.Fragment key={option.value}>
                              <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center mb-3">
                                <label
                                  htmlFor={option.value}
                                  className="radioLabel"
                                >
                                  <input
                                    type="radio"
                                    id={option.value}
                                    className="radioInput"
                                    {...field}
                                    value={option.value}
                                    checked={field.value === option.value}
                                  />
                                  <span className="checkboxLabel">
                                    {option.label}
                                  </span>
                                </label>
                              </div>
                            </React.Fragment>
                          ))
                        }
                      </Field>
                    </div>

                    <div className="row d-flex">
                      <div className="col-lg-2 col-md-2 col-sm-12 title mb-3">
                        <label htmlFor="physicalActivityEveryDayForAtLeast30Min">
                        Physical activity / exercise every day for at least 30 min
                        </label>
                      </div>

                      <Field
                        name="physicalActivityEveryDayForAtLeast30Min"
                        id="physicalActivityEveryDayForAtLeast30Min"
                      >
                        {({ field }) =>
                          consultingDoctorRegularly.map((option) => (
                            <React.Fragment key={option.value}>
                              <div className="col-lg-1 col-md-1 col-sm-12 d-flex align-items-center justify-content-center mb-3">
                                <label
                                  htmlFor={option.value}
                                  className="radioLabel"
                                >
                                  <input
                                    type="radio"
                                    id={option.value}
                                    className="radioInput"
                                    {...field}
                                    value={option.value}
                                    checked={field.value === option.value}
                                  />
                                  <span className="checkboxLabel">
                                    {option.label}
                                  </span>
                                </label>
                              </div>
                            </React.Fragment>
                          ))
                        }
                      </Field>
                    </div>

                    
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-end m-4">
            <button className="btn btn-success mt-4" type="submit">
              Submit
            </button>
          </div>

        </Form>
        
      )}
    </Formik>
  );
}

export default GoogleForm;
