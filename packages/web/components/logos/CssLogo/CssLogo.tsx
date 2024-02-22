interface Props {
  className?: string;
  size?: number;
}

const CssLogo = ({ className, size = 96 }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 0 362.73401 511.99998"
      id="svg3476"
      version="1.1"
      className={className}
    >
      <title>CSS</title>
      <g transform="translate(-193.633,-276.3622)">
        <g transform="translate(119,276.3622)">
          <polygon
            points="437.367,100.62 404.321,470.819 255.778,512 107.644,470.877 74.633,100.62 "
            fill="#264de4"
          />
          <polygon
            points="376.03,447.246 404.27,130.894 256,130.894 256,480.523 "
            fill="#2965f1"
          />
          <polygon
            points="150.31,268.217 154.38,313.627 256,313.627 256,268.217 "
            fill="#ebebeb"
          />
          <polygon
            points="256,176.305 255.843,176.305 142.132,176.305 146.26,221.716 256,221.716 "
            fill="#ebebeb"
          />
          <polygon
            points="256,433.399 256,386.153 255.801,386.206 205.227,372.55 201.994,336.333 177.419,336.333 156.409,336.333 162.771,407.634 255.791,433.457 "
            fill="#ebebeb"
          />
          <path
            fill="var(--color-text)"
            d="m 160,0 55,0 0,23 -32,0 0,23 32,0 0,23 -55,0 z"
          />
          <path
            fill="var(--color-text)"
            d="m 226,0 55,0 0,20 -32,0 0,4 32,0 0,46 -55,0 0,-21 32,0 0,-4 -32,0 z"
          />
          <path
            id="path3003"
            fill="var(--color-text)"
            d="m 292,0 55,0 0,20 -32,0 0,4 32,0 0,46 -55,0 0,-21 32,0 0,-4 -32,0 z"
          />
          <polygon
            points="311.761,313.627 306.49,372.521 255.843,386.191 255.843,433.435 348.937,407.634 349.62,399.962 360.291,280.411 361.399,268.217 369.597,176.305 255.843,176.305 255.843,221.716 319.831,221.716 315.699,268.217 255.843,268.217 255.843,313.627 "
            fill="#ffffff"
          />
        </g>
      </g>
    </svg>
  );
};

export default CssLogo;
