import {javascriptGenerator, JavascriptGenerator} from "blockly/javascript";
import {Names, Variables, Workspace} from "blockly";
import NameType = Names.NameType;

class VueGenerator extends JavascriptGenerator {
    init(workspace: Workspace) {
        super.init(workspace);

        if (!this.nameDB_) {
            this.nameDB_ = new Names(this.RESERVED_WORDS_);
        } else {
            this.nameDB_.reset();
        }

        this.nameDB_.setVariableMap(workspace.getVariableMap());
        this.nameDB_.populateVariables(workspace);
        this.nameDB_.populateProcedures(workspace);

        const defvars = [];
        // Add developer variables (not created or named by the user).
        const devVarList = Variables.allDeveloperVariables(workspace);
        for (let i = 0; i < devVarList.length; i++) {
            defvars.push(
                this.nameDB_.getName(devVarList[i], NameType.DEVELOPER_VARIABLE),
            );
        }

        // Add user variables, but only ones that are being used.
        const variables = Variables.allUsedVarModels(workspace);
        for (let i = 0; i < variables.length; i++) {
            defvars.push(
                this.nameDB_.getName(variables[i].getId(), NameType.VARIABLE),
            );
        }

        // Declare all of the variables.
        if (defvars.length) {
            this.definitions_['variables'] = `let state = reactive({${defvars.map(v => `${v}: null`).join(',')}})`;
        }
        this.isInitialized = true;
    }
}

export const vueGenerator = new VueGenerator('vue');


for (const name in javascriptGenerator.forBlock) {
    vueGenerator.forBlock[name] = javascriptGenerator.forBlock[name];
}