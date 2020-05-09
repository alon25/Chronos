import React from 'react';

const ServicesList = (props) => {
  const { context, Click, isClicked } = props;
  const buttonStore = [];
  for (let i = 0; i < context.length; i += 1) {
    buttonStore.push(
      <button
        className="microserviceBtn"
        id={i}
        type="button"
        key={`${i}${context[i]}`}
        onClick={Click}
        isClicked={isClicked}
      >
        {context[i]}
      </button>
    );
  }
  return (
    buttonStore
  );
};

export default ServicesList;