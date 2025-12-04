import svgPaths from "./svg-yragh2w9z4";
import imgImageWithFallback from "figma:asset/5700baa85d45f05eabf822b7d8458cd735d1e446.png";
import imgImage from "figma:asset/b06eb000bab405ee03f86c2f795d02b89d26c880.png";
import imgImage1 from "figma:asset/612d4ce7e6f028251681136a155b76c1a3577daf.png";
import imgImage2 from "figma:asset/86294cc3eea8549178cae3f0449e88e6c6ccdbc8.png";
import imgImage3 from "figma:asset/2825fd2fe172d13beda6f3b6bd23aeec83a3d0ea.png";
import imgImage4 from "figma:asset/42301514e89c9d46c8c62603e6aac69e238bdb15.png";
import imgImage5 from "figma:asset/431ae45b0c345b801f666c946cda88eaa11e2b36.png";

function Heading() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[24px] left-0 not-italic text-[#7ee5ff] text-[36px] text-nowrap top-[-2.2px] tracking-[0.4px] whitespace-pre">Incident Detail View</p>
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="h-[233.3px] relative shrink-0 w-[416px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid box-border inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[233.3px] w-[416px]" />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-[#2a2a2a] h-[234.9px] left-0 rounded-[14px] top-0 w-[417.6px]" data-name="Container">
      <div className="box-border content-stretch flex h-[234.9px] items-center justify-center overflow-clip p-[0.8px] relative rounded-[inherit] w-[417.6px]">
        <ImageWithFallback />
      </div>
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container1() {
  return <div className="absolute h-0 left-0 top-0 w-[416px]" data-name="Container" />;
}

function Container2() {
  return <div className="absolute left-[335554px] size-0 top-[810595px]" data-name="Container" />;
}

function Container3() {
  return <div className="h-0 shrink-0 w-full" data-name="Container" />;
}

function Image() {
  return (
    <div className="absolute left-[46px] size-[256px] top-[-64px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage} />
    </div>
  );
}

function Image1() {
  return (
    <div className="absolute left-[302px] size-[256px] top-[-64px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage1} />
    </div>
  );
}

function Image2() {
  return (
    <div className="absolute left-[46px] size-[256px] top-[192px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage2} />
    </div>
  );
}

function Image3() {
  return (
    <div className="absolute left-[302px] size-[256px] top-[192px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage3} />
    </div>
  );
}

function Image4() {
  return (
    <div className="absolute left-[-210px] size-[256px] top-[-64px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage4} />
    </div>
  );
}

function Image5() {
  return (
    <div className="absolute left-[-210px] size-[256px] top-[192px]" data-name="Image">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage5} />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Container">
      <Image />
      <Image1 />
      <Image2 />
      <Image3 />
      <Image4 />
      <Image5 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute box-border content-stretch flex flex-col items-start left-0 pb-0 pr-[141px] size-0 top-0" data-name="Container">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Container6() {
  return <div className="absolute bg-[rgba(239,68,68,0.3)] left-[-20.18px] opacity-[0.591] size-[40.36px] top-[-20.18px]" data-name="Container" />;
}

function Container7() {
  return (
    <div className="absolute bg-red-500 left-[-12px] rounded-[12px] size-[24px] top-[-12px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[2.4px] border-solid border-white inset-0 pointer-events-none rounded-[12px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.4)]" />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-0 relative shrink-0 w-full" data-name="Container">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[-36px] size-[24px] top-[171px]" data-name="Button">
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute left-[109px] size-0 top-[-35px]" data-name="Container">
      <Container2 />
      <Container5 />
      <Button />
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute h-[8px] left-0 top-[3.2px] w-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 8">
        <g clipPath="url(#clip0_13_401)" id="Icon">
          <path d="M0 0H12V4H0V0Z" fill="var(--fill-0, #4C7BE1)" id="Vector" />
          <path d="M0 4H12V7H0V4Z" fill="var(--fill-0, #FFD500)" id="Vector_2" />
          <path d="M0 7H12V8H0V7Z" fill="var(--fill-0, #E0BC00)" id="Vector_3" />
        </g>
        <defs>
          <clipPath id="clip0_13_401">
            <rect fill="white" height="8" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Link() {
  return (
    <div className="absolute h-[13.6px] left-[5px] top-[1.6px] w-[51.375px]" data-name="Link">
      <Icon />
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[16.8px] left-[12px] not-italic text-[#0078a8] text-[12px] text-nowrap top-[-2px] whitespace-pre">Leaflet</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute content-stretch flex h-[13.6px] items-start left-[59.71px] top-[1.6px] w-[3.125px]" data-name="Text">
      <p className="font-['Arial:Regular',_sans-serif] leading-[16.8px] not-italic relative shrink-0 text-[#333333] text-[12px] text-nowrap whitespace-pre">|</p>
    </div>
  );
}

function Link1() {
  return (
    <div className="absolute content-stretch flex h-[13.6px] items-start left-[78.35px] top-[1.6px] w-[84.725px]" data-name="Link">
      <p className="font-['Arial:Regular',_sans-serif] leading-[16.8px] not-italic relative shrink-0 text-[#0078a8] text-[12px] text-nowrap whitespace-pre">OpenStreetMap</p>
    </div>
  );
}

function Link2() {
  return (
    <div className="absolute content-stretch flex h-[13.6px] items-start left-[244.63px] top-[1.6px] w-[41.575px]" data-name="Link">
      <p className="font-['Arial:Regular',_sans-serif] leading-[16.8px] not-italic relative shrink-0 text-[#0078a8] text-[12px] text-nowrap whitespace-pre">CARTO</p>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.8)] h-[16.8px] left-[124.8px] top-[283.2px] w-[291.2px]" data-name="Container">
      <Link />
      <Text />
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[16.8px] left-[62.84px] not-italic text-[#333333] text-[12px] text-nowrap top-[-0.4px] whitespace-pre">©</p>
      <Link1 />
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[16.8px] left-[163.07px] not-italic text-[#333333] text-[12px] text-nowrap top-[-0.4px] whitespace-pre">contributors ©</p>
      <Link2 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bg-[#dddddd] h-[300px] left-0 overflow-clip rounded-[14px] top-0 w-[416px]" data-name="Container">
      <Container1 />
      <Container9 />
      <Container10 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#2a2a2a] relative rounded-[4px] shrink-0 size-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-[0.8px] relative size-[32px]">
        <p className="font-['Arial:Regular',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">+</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="basis-0 bg-[#2a2a2a] grow min-h-px min-w-px relative rounded-[4px] shrink-0 w-[32px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-full items-center justify-center p-[0.8px] relative w-[32px]">
        <p className="font-['Arial:Regular',_sans-serif] leading-[24px] not-italic relative shrink-0 text-[16px] text-nowrap text-white whitespace-pre">−</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[72px] items-start left-[372px] top-[12px] w-[32px]" data-name="Container">
      <Button1 />
      <Button2 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p14548f00} id="Vector" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17781bc0} id="Vector_2" stroke="var(--stroke-0, #FB2C36)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[121.4px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[121.4px]">
        <p className="absolute font-['Arial:Regular',_sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-[-2.2px] whitespace-pre">Incident Location</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute box-border content-stretch flex gap-[8px] h-[41.6px] items-center left-[12px] pl-[12.8px] pr-[0.8px] py-[0.8px] rounded-[10px] top-[179.7px] w-[171px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon1 />
      <Text1 />
    </div>
  );
}

function IncidentMap() {
  return (
    <div className="bg-[#1a1a1a] h-[233.3px] relative shrink-0 w-full" data-name="IncidentMap">
      <Container11 />
      <Container12 />
      <Container13 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute bg-[#2a2a2a] h-[234.9px] left-[441.6px] rounded-[14px] top-0 w-[417.6px]" data-name="Container">
      <div className="box-border content-stretch flex flex-col h-[234.9px] items-start overflow-clip p-[0.8px] relative rounded-[inherit] w-[417.6px]">
        <IncidentMap />
      </div>
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[234.9px] relative shrink-0 w-full" data-name="Container">
      <Container />
      <Container14 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p15268c80} id="Vector" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M12.5 4.80334V17.3033" id="Vector_2" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M7.5 2.69666V15.1967" id="Vector_3" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[#2a2a2a] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-[0.8px] relative size-[40px]">
        <Icon2 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[20px] left-0 not-italic text-[#99a1af] text-[14px] text-nowrap top-[-1.2px] whitespace-pre">Location</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-[-2.2px] whitespace-pre">Detail Map</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[44px] relative shrink-0 w-[77.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-start relative w-[77.2px]">
        <Container17 />
        <Container18 />
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[12px] h-[44px] items-center relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Container19 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2cf60600} id="Vector" stroke="var(--stroke-0, #FF8904)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-[#2a2a2a] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-[0.8px] relative size-[40px]">
        <Icon3 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[20px] left-0 not-italic text-[#99a1af] text-[14px] text-nowrap top-[-1.2px] whitespace-pre">Category</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-[-2.2px] whitespace-pre">Fire</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[44px] relative shrink-0 w-[55.95px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-start relative w-[55.95px]">
        <Container22 />
        <Container23 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex gap-[12px] h-[44px] items-center relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Container24 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_13_390)" id="Icon">
          <path d="M10 5V10L13.3333 11.6667" id="Vector" stroke="var(--stroke-0, #05DF72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p14d24500} id="Vector_2" stroke="var(--stroke-0, #05DF72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_13_390">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[#2a2a2a] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-[0.8px] relative size-[40px]">
        <Icon4 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[20px] left-0 not-italic text-[#99a1af] text-[14px] text-nowrap top-[-1.2px] whitespace-pre">Reported</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-[-2.2px] whitespace-pre">2m ago</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="h-[44px] relative shrink-0 w-[56.9px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[44px] items-start relative w-[56.9px]">
        <Container27 />
        <Container28 />
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex gap-[12px] h-[44px] items-center relative shrink-0 w-full" data-name="Container">
      <Container26 />
      <Container29 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_13_411)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #FDC700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 6.66667V10" id="Vector_2" stroke="var(--stroke-0, #FDC700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 13.3333H10.0083" id="Vector_3" stroke="var(--stroke-0, #FDC700)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_13_411">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-[#2a2a2a] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center p-[0.8px] relative size-[40px]">
        <Icon5 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[20px] left-0 not-italic text-[#99a1af] text-[14px] text-nowrap top-[-1.2px] whitespace-pre">Status</p>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[rgba(240,177,0,0.1)] h-[21.587px] relative rounded-[8px] shrink-0 w-full" data-name="Badge">
      <div className="h-[21.587px] overflow-clip relative rounded-[inherit] w-full">
        <p className="absolute font-['Arial:Regular',_sans-serif] leading-[16px] left-[8.8px] not-italic text-[#fdc700] text-[12px] text-nowrap top-[1.8px] whitespace-pre">Pending</p>
      </div>
      <div aria-hidden="true" className="absolute border-[0.8px] border-[rgba(240,177,0,0.3)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container33() {
  return (
    <div className="h-[45.587px] relative shrink-0 w-[62.188px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[45.587px] items-start relative w-[62.188px]">
        <Container32 />
        <Badge />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex gap-[12px] h-[45.587px] items-center relative shrink-0 w-full" data-name="Container">
      <Container31 />
      <Container33 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[225.588px] items-start relative shrink-0 w-full" data-name="Container">
      <Container20 />
      <Container25 />
      <Container30 />
      <Container34 />
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute bg-[#252525] box-border content-stretch flex flex-col h-[276px] items-start left-[0.1px] pb-[0.8px] pt-[24.8px] px-[24.8px] rounded-[14px] top-[-0.36px] w-[408px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container35 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-[#2a2a2a] h-[49.6px] left-[724.11px] rounded-[10px] top-[225.59px] w-[135.088px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#3a3a3a] border-[0.8px] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <p className="absolute font-['Arial:Regular',_sans-serif] leading-[24px] left-[32.8px] not-italic text-[16px] text-nowrap text-white top-[10.6px] whitespace-pre">Set Status</p>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[275.188px] relative shrink-0 w-full" data-name="Container">
      <Container36 />
      <Button3 />
    </div>
  );
}

function Container38() {
  return (
    <div className="bg-[#1a1a1a] h-[710.088px] relative rounded-[16px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] shrink-0 w-[955.2px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[48px] h-[710.088px] items-start pb-0 pt-[48px] px-[48px] relative w-[955.2px]">
        <Heading />
        <Container15 />
        <Container37 />
      </div>
    </div>
  );
}

export default function RedesignIncidentDetailView() {
  return (
    <div className="bg-neutral-950 content-stretch flex items-center justify-center relative size-full" data-name="Redesign Incident Detail View">
      <Container38 />
    </div>
  );
}