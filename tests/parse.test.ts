import { parseTypescript } from "../mod.ts";
import { assertEquals } from "./deps.ts";

Deno.test("parse (no error)", () => {
  const result = parseTypescript({
    src: "const x: number = 2;",
  });
  assertEquals(result, {
    type: "ok",
    value: {
      type: "Module",
      body: [
        {
          declarations: [
            {
              definite: false,
              id: {
                optional: false,
                span: { ctxt: 0, end: 7, start: 6 },
                type: "Identifier",
                typeAnnotation: {
                  span: { ctxt: 0, end: 15, start: 7 },
                  type: "TsTypeAnnotation",
                  typeAnnotation: {
                    kind: "number",
                    span: { ctxt: 0, end: 15, start: 9 },
                    type: "TsKeywordType",
                  },
                },
                value: "x",
              },
              init: {
                span: { ctxt: 0, end: 19, start: 18 },
                type: "NumericLiteral",
                value: 2,
              },
              span: { ctxt: 0, end: 19, start: 6 },
              type: "VariableDeclarator",
            },
          ],
          declare: false,
          kind: "const",
          span: { ctxt: 0, end: 20, start: 0 },
          type: "VariableDeclaration",
        },
      ],
      interpreter: null,
      span: { ctxt: 0, end: 20, start: 0 },
    },
  });
});

Deno.test("parse (with errors)", () => {
  const result = parseTypescript({ src: "x = 3 3" });
  assertEquals(result, { type: "error", error: "" });
});