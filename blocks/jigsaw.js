import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

Blockly.defineBlocksWithJsonArray([
  {
    "type": "jigsaw_app",
    "message0": "App %1 %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "CHILDREN"
      }
    ],
    "colour": 300,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "jigsaw_text",
    "message0": "Text %1",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 150,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "jigsaw_button",
    "message0": "Button %1 on click %2 label %3",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "ONCLICK"
      },
      {
        "type": "input_statement",
        "name": "CHILDREN"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 150,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "jigsaw_flex",
    "message0": "Flex %1 %2 %3",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "FLEX_DIR",
        "options": [
          [
            "Row",
            "row"
          ],
          [
            "Column",
            "column"
          ]
        ]
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "ITEMS"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 150,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "jigsaw_input",
    "message0": "Text Input %1 state %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "STATE",
        "align": "RIGHT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 150,
    "tooltip": "",
    "helpUrl": ""
  }
])


javascriptGenerator.scrub_ = function(block, code, thisOnly) {
  const nextBlock = block.nextConnection?.targetBlock();

  const isJigsawBlock = block.type.startsWith('jigsaw_');

  if (nextBlock && !thisOnly) {
    return code + (isJigsawBlock ? ',\n': '') + javascriptGenerator.blockToCode(nextBlock);
  }
  return code;
};


javascriptGenerator.forBlock["jigsaw_app"] = function (block, generator) {
  var statements_children = generator.statementToCode(block, 'CHILDREN');
  const code = `return h("div", {}, [\n${statements_children}]);`;
  return code;
};

javascriptGenerator.forBlock['jigsaw_text'] = function(block, generator) {
  var text = generator.valueToCode(block, 'TEXT', Order.ATOMIC);
  var code = `${text}\n`;
  return code;
};

javascriptGenerator.forBlock["jigsaw_button"] = function (block, generator) {
  var statements_onclick = generator.statementToCode(block, 'ONCLICK');
  var statements_children = generator.statementToCode(block, 'CHILDREN');
  const code = `h("button", { click: (e) => {\n${statements_onclick}}}, [\n${statements_children}])\n`;
  return code;
};

javascriptGenerator.forBlock['jigsaw_flex'] = function(block, generator) {
  var dropdown_flex_dir = block.getFieldValue('FLEX_DIR');
  var statements_items = generator.statementToCode(block, 'ITEMS');
  var code = `h("div", { style: "display:flex;flex-direction:${dropdown_flex_dir};" }, [\n${statements_items}])\n`;
  return code;
};

javascriptGenerator.forBlock['jigsaw_input'] = function(block, generator) {
  var value_state = generator.valueToCode(block, 'STATE', Order.ATOMIC);
  var code = `h("input", { type: "text", value: () => ${value_state} })\n`;
  return code;
};
