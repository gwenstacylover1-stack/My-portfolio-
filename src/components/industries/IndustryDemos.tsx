import type { IndustryId } from './industryCatalog';
import {
  EcommerceDemo,
  HealthcareDemo,
  RealEstateDemo,
} from './demos/DemosGroupA';
import {
  FinanceDemo,
  HospitalityDemo,
  LightingDemo,
} from './demos/DemosGroupB';
import {
  AutomotiveDemo,
  EducationDemo,
  SaasDemo,
} from './demos/DemosGroupC';

interface IndustryDemoRendererProps {
  industryId: IndustryId;
  isMobileViewport: boolean;
  inquiryHref: string;
}

export function IndustryDemoRenderer({
  industryId,
  isMobileViewport,
  inquiryHref,
}: IndustryDemoRendererProps) {
  const props = { isMobileViewport, inquiryHref };

  switch (industryId) {
    case 'real-estate':
      return <RealEstateDemo {...props} />;
    case 'healthcare':
      return <HealthcareDemo {...props} />;
    case 'ecommerce':
      return <EcommerceDemo {...props} />;
    case 'lighting':
      return <LightingDemo {...props} />;
    case 'hospitality':
      return <HospitalityDemo {...props} />;
    case 'finance':
      return <FinanceDemo {...props} />;
    case 'education':
      return <EducationDemo {...props} />;
    case 'automotive':
      return <AutomotiveDemo {...props} />;
    case 'saas':
      return <SaasDemo {...props} />;
  }
}
