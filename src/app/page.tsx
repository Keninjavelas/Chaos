import { IntroFlow } from "@/components/intro/IntroFlow";
import { ensurePortfolioValidation } from "@/data/validatePortfolioData";

export default function Home() {
  ensurePortfolioValidation();
  return <IntroFlow />;
}
