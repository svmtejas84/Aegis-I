import svgPaths from "./svg-fxavcettkm";
import imgImageCityMap from "figma:asset/3cf4bb08d801cdb6a096514ccc6c6dae35dcd4d0.png";

function Navigation() {
  return (
    <div className="bg-black h-[814px] relative shrink-0 w-[319px]" data-name="Navigation">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[814px] items-start pb-0 pt-[24px] px-[24px] relative w-[319px]">
        <div className="font-['Arial:Regular',_sans-serif] leading-[60px] not-italic relative shrink-0 text-[32px] text-nowrap text-white whitespace-pre">
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">&nbsp;</p>
          <p className="mb-0">&nbsp;</p>
          <p>
            {`     Prioritize `}
            <br aria-hidden="true" />
            {`     Broadcast Alert `}
            <br aria-hidden="true" />
            {`     Log Out `}
          </p>
        </div>
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[30px] left-0 not-italic text-[#2d3748] text-[20px] text-nowrap top-[-2.4px] whitespace-pre">Mission Control Screen</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[78.8px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.8px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[78.8px] items-start pb-[0.8px] pt-[24px] px-[24px] relative w-full">
          <Heading />
        </div>
      </div>
    </div>
  );
}

function ImageCityMap() {
  return (
    <div className="absolute h-[300px] left-0 top-0 w-[1091.2px]" data-name="Image (City Map)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageCityMap} />
    </div>
  );
}

function Container1() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.2)] h-[300px] left-0 to-[rgba(0,0,0,0)] top-0 w-[1091.2px]" data-name="Container" />;
}

function Icon() {
  return (
    <div className="absolute left-0 size-[40px] top-0" data-name="Icon">
      <div className="absolute inset-[-5.83%_-7.5%_-25.83%_-7.5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 53">
          <g filter="url(#filter0_d_1_180)" id="Icon">
            <path d={svgPaths.pa2b0e00} fill="var(--fill-0, #FB2C36)" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
            <path d={svgPaths.p2963bb00} fill="var(--fill-0, #FB2C36)" id="Vector_2" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="56" id="filter0_d_1_180" width="56" x="-5" y="-1.66667">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_180" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_180" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-white left-[32px] opacity-[0.759] rounded-[2.68435e+07px] size-[12px] top-[-4px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#fb2c36] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[2.68435e+07px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute left-[361.91px] size-[40px] top-[35px]" data-name="Container">
      <Icon />
      <Container2 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-0 size-[40px] top-0" data-name="Icon">
      <div className="absolute inset-[-5.83%_-7.5%_-25.83%_-7.5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 53">
          <g filter="url(#filter0_d_1_180)" id="Icon">
            <path d={svgPaths.pa2b0e00} fill="var(--fill-0, #FB2C36)" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
            <path d={svgPaths.p2963bb00} fill="var(--fill-0, #FB2C36)" id="Vector_2" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="56" id="filter0_d_1_180" width="56" x="-5" y="-1.66667">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_180" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_180" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-white left-[32px] opacity-[0.759] rounded-[2.68435e+07px] size-[12px] top-[-4px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#fb2c36] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[2.68435e+07px]" />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute left-[252.8px] size-[40px] top-[95px]" data-name="Container">
      <Icon1 />
      <Container4 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-0 size-[40px] top-0" data-name="Icon">
      <div className="absolute inset-[-5.83%_-7.5%_-25.83%_-7.5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 53">
          <g filter="url(#filter0_d_1_180)" id="Icon">
            <path d={svgPaths.pa2b0e00} fill="var(--fill-0, #FB2C36)" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
            <path d={svgPaths.p2963bb00} fill="var(--fill-0, #FB2C36)" id="Vector_2" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="56" id="filter0_d_1_180" width="56" x="-5" y="-1.66667">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_180" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_180" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-white left-[32px] opacity-[0.759] rounded-[2.68435e+07px] size-[12px] top-[-4px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#fb2c36] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[2.68435e+07px]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute left-[580.15px] size-[40px] top-[65px]" data-name="Container">
      <Icon2 />
      <Container6 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-0 size-[40px] top-0" data-name="Icon">
      <div className="absolute inset-[-5.83%_-7.5%_-25.83%_-7.5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 53">
          <g filter="url(#filter0_d_1_180)" id="Icon">
            <path d={svgPaths.pa2b0e00} fill="var(--fill-0, #FB2C36)" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
            <path d={svgPaths.p2963bb00} fill="var(--fill-0, #FB2C36)" id="Vector_2" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="56" id="filter0_d_1_180" width="56" x="-5" y="-1.66667">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_180" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_180" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute bg-white left-[32px] opacity-[0.759] rounded-[2.68435e+07px] size-[12px] top-[-4px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#fb2c36] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[2.68435e+07px]" />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute left-[743.84px] size-[40px] top-[50px]" data-name="Container">
      <Icon3 />
      <Container8 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-0 size-[40px] top-0" data-name="Icon">
      <div className="absolute inset-[-5.83%_-7.5%_-25.83%_-7.5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 53">
          <g filter="url(#filter0_d_1_180)" id="Icon">
            <path d={svgPaths.pa2b0e00} fill="var(--fill-0, #FB2C36)" id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
            <path d={svgPaths.p2963bb00} fill="var(--fill-0, #FB2C36)" id="Vector_2" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="56" id="filter0_d_1_180" width="56" x="-5" y="-1.66667">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_180" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_1_180" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-white left-[32px] opacity-[0.759] rounded-[2.68435e+07px] size-[12px] top-[-4px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#fb2c36] border-[1.6px] border-solid inset-0 pointer-events-none rounded-[2.68435e+07px]" />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute left-[689.27px] size-[40px] top-[110px]" data-name="Container">
      <Icon4 />
      <Container10 />
    </div>
  );
}

function Container12() {
  return (
    <div className="h-[300px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <ImageCityMap />
      <Container1 />
      <Container3 />
      <Container5 />
      <Container7 />
      <Container9 />
      <Container11 />
    </div>
  );
}

function Container13() {
  return (
    <div className="bg-white box-border content-stretch flex flex-col h-[378.8px] items-start overflow-clip relative rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <Container />
      <Container12 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[30px] left-0 not-italic text-[#2d3748] text-[20px] text-nowrap top-[-2.4px] whitespace-pre">Live Triage Feed</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute box-border content-stretch flex flex-col h-[78.8px] items-start left-0 pb-[0.8px] pt-[24px] px-[24px] top-0 w-[1091.2px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.8px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Heading1 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[24px] size-[20px] top-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2cf60600} id="Vector" stroke="var(--stroke-0, #2D3748)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[21.6px] items-start left-[60px] top-[16.8px] w-[133.375px]" data-name="Text">
      <p className="font-['Arial:Regular',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[#2d3748] text-[16px] text-nowrap whitespace-pre">{`Main St & Oak Ave`}</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[24px] left-[935.27px] top-[16px] w-[53.737px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[24px] left-0 not-italic text-[16px] text-gray-400 text-nowrap top-[-2.2px] whitespace-pre">5m ago</p>
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute bg-[#d4183d] h-[21.587px] left-[1005.01px] rounded-[8px] top-[17.2px] w-[62.188px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[21.587px] items-center justify-center overflow-clip px-[8.8px] py-[2.8px] relative rounded-[inherit] w-[62.188px]">
        <p className="font-['Arial:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">Pending</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute h-[56.8px] left-0 top-0 w-[1091.2px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.8px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Icon5 />
      <Text />
      <Text1 />
      <Badge />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[24px] size-[20px] top-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #2D3748)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p18406864} id="Vector_2" stroke="var(--stroke-0, #2D3748)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, #2D3748)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, #2D3748)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute content-stretch flex h-[21.6px] items-start left-[60px] top-[16.8px] w-[133.375px]" data-name="Text">
      <p className="font-['Arial:Regular',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[#2d3748] text-[16px] text-nowrap whitespace-pre">{`Main St & Oak Ave`}</p>
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[24px] left-[935.27px] top-[16px] w-[53.737px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[24px] left-0 not-italic text-[16px] text-gray-400 text-nowrap top-[-2.2px] whitespace-pre">5m ago</p>
    </div>
  );
}

function Badge1() {
  return (
    <div className="absolute bg-[#d4183d] h-[21.587px] left-[1005.01px] rounded-[8px] top-[17.2px] w-[62.188px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[21.587px] items-center justify-center overflow-clip px-[8.8px] py-[2.8px] relative rounded-[inherit] w-[62.188px]">
        <p className="font-['Arial:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">Pending</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute h-[56.8px] left-0 top-[56.8px] w-[1091.2px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.8px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Icon6 />
      <Text2 />
      <Text3 />
      <Badge1 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[24px] size-[20px] top-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p270c5f00} id="Vector" stroke="var(--stroke-0, #2D3748)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 7.5V10.8333" id="Vector_2" stroke="var(--stroke-0, #2D3748)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.1667H10.0083" id="Vector_3" stroke="var(--stroke-0, #2D3748)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute content-stretch flex h-[21.6px] items-start left-[60px] top-[16.8px] w-[130.238px]" data-name="Text">
      <p className="font-['Arial:Regular',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[#2d3748] text-[16px] text-nowrap whitespace-pre">Park Blvd near Elm</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[24px] left-[926.65px] top-[16px] w-[62.362px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[24px] left-0 not-italic text-[16px] text-gray-400 text-nowrap top-[-2.2px] whitespace-pre">10m ago</p>
    </div>
  );
}

function Badge2() {
  return (
    <div className="absolute bg-[#d4183d] h-[21.587px] left-[1005.01px] rounded-[8px] top-[17.2px] w-[62.188px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[21.587px] items-center justify-center overflow-clip px-[8.8px] py-[2.8px] relative rounded-[inherit] w-[62.188px]">
        <p className="font-['Arial:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">Pending</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute h-[56.8px] left-0 top-[113.6px] w-[1091.2px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.8px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Icon7 />
      <Text4 />
      <Text5 />
      <Badge2 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[24px] size-[20px] top-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2e0cc000} id="Vector" stroke="var(--stroke-0, #2D3748)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute content-stretch flex h-[21.6px] items-start left-[60px] top-[16.8px] w-[61.688px]" data-name="Text">
      <p className="font-['Arial:Regular',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[#2d3748] text-[16px] text-nowrap whitespace-pre">1km ago</p>
    </div>
  );
}

function Text7() {
  return (
    <div className="absolute h-[24px] left-[926.65px] top-[16px] w-[62.362px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[24px] left-0 not-italic text-[16px] text-gray-400 text-nowrap top-[-2.2px] whitespace-pre">10m ago</p>
    </div>
  );
}

function Badge3() {
  return (
    <div className="absolute bg-[#d4183d] h-[21.587px] left-[1005.01px] rounded-[8px] top-[17.2px] w-[62.188px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[21.587px] items-center justify-center overflow-clip px-[8.8px] py-[2.8px] relative rounded-[inherit] w-[62.188px]">
        <p className="font-['Arial:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[12px] text-nowrap text-white whitespace-pre">Pending</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute h-[56.8px] left-0 top-[170.4px] w-[1091.2px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.8px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Icon8 />
      <Text6 />
      <Text7 />
      <Badge3 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-[24px] size-[20px] top-[18px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p382997c0} id="Vector" stroke="var(--stroke-0, #2D3748)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2ad65a80} id="Vector_2" stroke="var(--stroke-0, #2D3748)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M7.5 14.1667H12.5" id="Vector_3" stroke="var(--stroke-0, #2D3748)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3849af00} id="Vector_4" stroke="var(--stroke-0, #2D3748)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute content-stretch flex h-[21.6px] items-start left-[60px] top-[16.8px] w-[97.95px]" data-name="Text">
      <p className="font-['Arial:Regular',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[#2d3748] text-[16px] text-nowrap whitespace-pre">Riverside Park</p>
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute h-[24px] left-[921.85px] top-[16px] w-[62.362px]" data-name="Text">
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[24px] left-0 not-italic text-[16px] text-gray-400 text-nowrap top-[-2.2px] whitespace-pre">15m ago</p>
    </div>
  );
}

function Badge4() {
  return (
    <div className="absolute bg-[#eceef2] h-[21.587px] left-[1000.21px] rounded-[8px] top-[17.2px] w-[66.987px]" data-name="Badge">
      <div className="box-border content-stretch flex gap-[4px] h-[21.587px] items-center justify-center overflow-clip px-[8.8px] py-[2.8px] relative rounded-[inherit] w-[66.987px]">
        <p className="font-['Arial:Regular',_sans-serif] leading-[16px] not-italic relative shrink-0 text-[#030213] text-[12px] text-nowrap whitespace-pre">Assigned</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[56.8px] left-0 top-[227.2px] w-[1091.2px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0.8px] border-gray-100 border-solid inset-0 pointer-events-none" />
      <Icon9 />
      <Text8 />
      <Text9 />
      <Badge4 />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute h-[284px] left-0 top-[78.8px] w-[1091.2px]" data-name="Container">
      <Container15 />
      <Container16 />
      <Container17 />
      <Container18 />
      <Container19 />
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-white h-[362.8px] overflow-clip relative rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="basis-0 grow h-[813.6px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[24px] h-[813.6px] items-start pb-0 pt-[24px] px-[24px] relative w-full">
          <Container13 />
          <Container21 />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="bg-neutral-100 content-stretch flex h-[813.6px] items-start relative shrink-0 w-full" data-name="App">
      <Navigation />
      <Container22 />
    </div>
  );
}

export default function ImmersiveScrollToRevealDashboard() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="Immersive Scroll-to-Reveal Dashboard">
      <App />
    </div>
  );
}