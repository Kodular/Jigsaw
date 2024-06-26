import * as Blockly from "blockly/core";
import {JavascriptGenerator, javascriptGenerator, Order} from "blockly/javascript";

import {blocks, registerProcedureSerializer, unregisterProcedureBlocks} from '@blockly/block-shareable-procedures';
import {vueGenerator} from "./VueGenerator.ts";

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
                "check": ["String", "Number"]
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
    },
    {
        type: "jigsaw_toast",
        message0: "Show Toast %1 message %2 duration %3",
        args0: [
            {
                type: "input_dummy"
            },
            {
                type: "input_value",
                name: "MESSAGE",
                align: "right"
            },
            {
                type: "input_value",
                name: "DURATION",
                align: "right"
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

vueGenerator.forBlock["jigsaw_app"] = function (block: Blockly.Block, generator: JavascriptGenerator) {
    const statements_children = generator.statementToCode(block, 'CHILDREN');
    const code = `</script><template>
<Ionic.IonApp>
${statements_children}
</Ionic.IonApp>
</template>`;
    return code;
};

vueGenerator.forBlock['jigsaw_text'] = function (block: Blockly.Block, generator: JavascriptGenerator) {
    const text = generator.valueToCode(block, 'TEXT', Order.ATOMIC);
    const code = `<Ionic.IonText><p>{{ ${text} }}</p></Ionic.IonText>\n`;
    return code;
};

vueGenerator.forBlock["jigsaw_button"] = function (block: Blockly.Block, generator: JavascriptGenerator) {
    const statements_onclick = generator.statementToCode(block, 'ONCLICK');
    const statements_children = generator.statementToCode(block, 'CHILDREN');

    const id = crypto.randomUUID()

    const functionName = generator.provideFunction_(
        `button${id}_click`,
        `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(event) {
${statements_onclick}
}`
    );

    const code = `<Ionic.IonButton @click="${functionName}">\n${statements_children}</Ionic.IonButton>\n`;
    return code;
};

vueGenerator.forBlock['jigsaw_flex'] = function (block: Blockly.Block, generator: JavascriptGenerator) {
    const dropdown_flex_dir = block.getFieldValue('FLEX_DIR');
    const statements_items = generator.statementToCode(block, 'ITEMS');
    const code = `<div style="display:flex;flex-direction:${dropdown_flex_dir};">\n${statements_items}</div>\n`;
    return code;
};

vueGenerator.forBlock['jigsaw_input'] = function (block: Blockly.Block, generator: JavascriptGenerator) {
    const value_state = generator.valueToCode(block, 'LABEL', Order.ATOMIC);
    const code = `<Ionic.IonInput :label="${value_state}"></Ionic.IonInput>\n`;
    return code;
};

vueGenerator.forBlock['jigsaw_toast'] = function (block: Blockly.Block, generator: JavascriptGenerator) {
    const message = generator.valueToCode(block, 'MESSAGE', Order.ATOMIC);
    const duration = generator.valueToCode(block, 'DURATION', Order.ATOMIC);

    // TODO: make a Jigsaw stdlib
    const functionName = generator.provideFunction_(
        'show_toast',
        `async function ${generator.FUNCTION_NAME_PLACEHOLDER_}(message, duration) {
    const toast = await Ionic.toastController.create({
      message,
      duration,
      position: 'bottom',
    });
    
    await toast.present();
}`
    );

    return `${functionName}(${message}, ${duration})`
}

// TODO: temporary way to make the variables reactive.
//  Try to separate normal variable from reactive/state variables.
vueGenerator.forBlock['variables_set'] = function (block: Blockly.Block, generator: JavascriptGenerator) {
    const var_name = generator.getVariableName(block.getFieldValue("VAR"))
    const var_value = generator.valueToCode(block, 'VALUE', Order.ATOMIC);

    return `state.${var_name} = ${var_value};\n`
}

vueGenerator.forBlock['variables_get'] = function (block: Blockly.Block, generator: JavascriptGenerator) {
    const var_name = generator.getVariableName(block.getFieldValue("VAR"))

    return [`state.${var_name}`, Order.ATOMIC]
}
