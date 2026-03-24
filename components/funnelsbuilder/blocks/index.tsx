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

// Common props that all block components receive
interface BlockComponentProps {
  block: Record<string, unknown>;
  onChange: (update: Record<string, unknown>) => void;
  preview?: boolean;
}

// Map of block types to components – we know they accept BlockComponentProps
const map: Record<string, React.ComponentType<BlockComponentProps>> = {
  hero: HeroBlock as React.ComponentType<BlockComponentProps>,
  headline: HeadlineBlock as React.ComponentType<BlockComponentProps>,
  subheading: SubheadingBlock as React.ComponentType<BlockComponentProps>,
  paragraph: ParagraphBlock as React.ComponentType<BlockComponentProps>,
  button: ButtonBlock as React.ComponentType<BlockComponentProps>,
  bullets: BulletsBlock as React.ComponentType<BlockComponentProps>,
  stars: StarsBlock as React.ComponentType<BlockComponentProps>,
  callout: CalloutBlock as React.ComponentType<BlockComponentProps>,
  guarantee: GuaranteeBlock as React.ComponentType<BlockComponentProps>,
  testimonial: TestimonialBlock as React.ComponentType<BlockComponentProps>,
  countdown: CountdownBlock as React.ComponentType<BlockComponentProps>,
  faq: FaqBlock as React.ComponentType<BlockComponentProps>,
  divider: DividerBlock as React.ComponentType<BlockComponentProps>,
  image: ImageBlock as React.ComponentType<BlockComponentProps>,
  video: VideoBlock as React.ComponentType<BlockComponentProps>,
  spacer: SpacerBlock as React.ComponentType<BlockComponentProps>,
};

interface RenderBlockProps {
  block: { type: string; [key: string]: unknown };
  onChange: (update: Record<string, unknown>) => void;
  preview?: boolean;
}

export const RenderBlock: React.FC<RenderBlockProps> = ({ block, onChange, preview }) => {
  const Component = map[block.type];
  if (!Component) {
    return (
      <div style={{ padding: 12, fontSize: 12, color: "#ccc" }}>
        Unknown: {block.type}
      </div>
    );
  }
  return <Component block={block} onChange={onChange} preview={preview} />;
};