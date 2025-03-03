// imports.gi
import GObject from 'gi://GObject';
import Shell from 'gi://Shell';
import Clutter from 'gi://Clutter';
import Cogl from 'gi://Cogl';

// local modules
import { loadShader } from '../utils/io.js';

// ------------------------------------------------------------------- [imports]

const { declarations, code } = loadShader(
  import.meta.url,
  'shader/clip_shadow.frag'
);

export const ClipShadowEffect = GObject.registerClass(
  {},
  class extends Shell.GLSLEffect {
    vfunc_build_pipeline(): void {
      const hook = Cogl.SnippetHook.FRAGMENT;
      this.add_glsl_snippet(hook, declarations, code, false);
    }

    vfunc_paint_target(node: Clutter.PaintNode, ctx: Clutter.PaintContext) {
      // Reset to default blend string.
      this.get_pipeline()?.set_blend(
        'RGBA = ADD(SRC_COLOR, DST_COLOR*(1-SRC_COLOR[A]))'
      );
      super.vfunc_paint_target(node, ctx);
    }
  }
);
