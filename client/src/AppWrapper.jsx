import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { RadioProvider } from "../src/components/Student/StudentEventManagement/TimeSlotContext";

/**
 * This component wraps our App with the providers we do not want to have in our tests
 */
const AppWrapper = ({ children }) => {
  return (
    <>
      <RadioProvider>
        <Toaster />
        <Router>{children}</Router>
      </RadioProvider>
    </>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppWrapper;
