import Button from "./Button";
import Heading from "./Heading";
import Section from "./Section";
import Tagline from "./Tagline";
import { roadmap } from "../constants";
import { check2, grid, loading1 } from "../assets";
import { Gradient } from "./design/Roadmap";
import DiabeticDetection from './DiabeticDetection'; // Import the DiabeticDetection component

const Roadmap = () => (
  <Section className="overflow-hidden" id="roadmap">
    <div className="container md:pb-10">
      <Heading tag="Ready to get started" title="Upload Image For Your Retina" />

      <DiabeticDetection />

      <Gradient />
    </div>
  </Section>
);

export default Roadmap;
