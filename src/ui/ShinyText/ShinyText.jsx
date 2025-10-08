import "./ShinyText.css";

const ShinyText = ({ 
  text, 
  disabled = false, 
  speed = 5, 
  className = "",
  // Props untuk AOS
  "data-aos": dataAos,
  "data-aos-duration": dataAosDuration,
  "data-aos-delay": dataAosDelay,
  "data-aos-offset": dataAosOffset,
  "data-aos-easing": dataAosEasing,
  "data-aos-once": dataAosOnce,
  // Props tambahan lainnya
  ...otherProps
}) => {
  const animationDuration = `${speed}s`;

  return (
    <div
      className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
      style={{ animationDuration }}
      data-aos={dataAos}
      data-aos-duration={dataAosDuration}
      data-aos-delay={dataAosDelay}
      data-aos-offset={dataAosOffset}
      data-aos-easing={dataAosEasing}
      data-aos-once={dataAosOnce}
      {...otherProps}
    >
      {text}
    </div>
  );
};

export default ShinyText;