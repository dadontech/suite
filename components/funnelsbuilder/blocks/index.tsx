import React from "react";
import { HeroBlock } from "./HeroBlock";
import { HeadlineBlock } from "./HeadlineBlock";
import { SubheadingBlock } from "./SubheadingBlock";
import { ParagraphBlock } from "./ParagraphBlock";
import { ButtonBlock } from "./ButtonBlock";
import { BulletsBlock } from "./BulletsBlock";
import { StarsBlock } from "./StarsBlock";
import { CalloutBlock } from "./CalloutBlock";
import { GuaranteeBlock } from "./GuaranteeBlock";
import { TestimonialBlock } from "./TestimonialBlock";
import { CountdownBlock } from "./CountdownBlock";
import { FaqBlock } from "./FaqBlock";
import { DividerBlock } from "./DividerBlock";
import { ImageBlock } from "./ImageBlock";
import { VideoBlock } from "./VideoBlock";
import { SpacerBlock } from "./SpacerBlock";

const map = {
  hero: HeroBlock,
  headline: HeadlineBlock,
  subheading: SubheadingBlock,
  paragraph: ParagraphBlock,
  button: ButtonBlock,
  bullets: BulletsBlock,
  stars: StarsBlock,
  callout: CalloutBlock,
  guarantee: GuaranteeBlock,
  testimonial: TestimonialBlock,
  countdown: CountdownBlock,
  faq: FaqBlock,
  divider: DividerBlock,
  image: ImageBlock,
  video: VideoBlock,
  spacer: SpacerBlock,
};

export const RenderBlock = ({ block, onChange, preview }) => {
  const C = map[block.type];
  return C ? <C block={block} onChange={onChange} preview={preview} /> : <div style={{ padding: 12, fontSize: 12, color: "#ccc" }}>Unknown: {block.type}</div>;
};