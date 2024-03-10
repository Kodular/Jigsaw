import * as Blockly from "blockly/core";
import {javascriptGenerator, Order} from "blockly/javascript";

import {blocks, registerProcedureSerializer, unregisterProcedureBlocks} from '@blockly/block-shareable-procedures';

unregisterProcedureBlocks();
Blockly.common.defineBlocks(blocks);
registerProcedureSerializer();


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
    "message0": "Text Input %1 label %2",
    "args0": [
      {
        "type": "input_dummy"
      },
      {
        "type": "input_value",
        "name": "LABEL",
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


// javascriptGenerator.scrub_ = function(block, code, thisOnly) {
//   const nextBlock = block.nextConnection?.targetBlock();

//   const isJigsawBlock = block.type.startsWith('jigsaw_');

//   if (nextBlock && !thisOnly) {
//     return code + (isJigsawBlock ? ',\n': '') + javascriptGenerator.blockToCode(nextBlock);
//   }
//   return code;
// };

javascriptGenerator.forBlock["jigsaw_app"] = function (block: Blockly.Block, generator: any) {
  const statements_children = generator.statementToCode(block, 'CHILDREN');
  const code = `</script><template>
  <ion-app>
    ${statements_children}
  </ion-app>
</template>`;
  return code;
};

javascriptGenerator.forBlock['jigsaw_text'] = function (block: Blockly.Block, generator: any) {
  const text = generator.valueToCode(block, 'TEXT', Order.ATOMIC);
  const code = `<ion-text><p>{{ ${text} }}</p></ion-text>\n`;
  return code;
};

javascriptGenerator.forBlock["jigsaw_button"] = function (block: Blockly.Block, generator: any) {
  const statements_onclick = generator.statementToCode(block, 'ONCLICK');
  const statements_children = generator.statementToCode(block, 'CHILDREN');

  // const functionName = generator.provideFunction_(
  //   'button_click',
  //   [
  //     `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(list) {`,
  //     `  return list[list.length - 1];`,
  //     `}`
  //   ]
  // );

  const code = `<ion-button @click="${statements_onclick.trim()}">\n${statements_children}</ion-button>\n`;
  return code;
};

javascriptGenerator.forBlock['jigsaw_flex'] = function (block: Blockly.Block, generator: any) {
  const dropdown_flex_dir = block.getFieldValue('FLEX_DIR');
  const statements_items = generator.statementToCode(block, 'ITEMS');
  const code = `<div style="display:flex;flex-direction:${dropdown_flex_dir};">\n${statements_items}</div>\n`;
  return code;
};

javascriptGenerator.forBlock['jigsaw_input'] = function (block: Blockly.Block, generator: any) {
  const value_state = generator.valueToCode(block, 'LABEL', Order.ATOMIC);
  const code = `<ion-input :label="${value_state}"></ion-input>\n`;
  return code;
};
