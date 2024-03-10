export default {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Control",
            "contents": [
                {
                    "kind": "block",
                    "type": "controls_if"
                },
            ]
        },
        {
            "kind": "category",
            "name": "Logic",
            "contents": [
                {
                    "kind": "block",
                    "type": "logic_compare"
                },
                {
                    "kind": "block",
                    "type": "logic_operation"
                },
                {
                    "kind": "block",
                    "type": "logic_negate"
                },
                {
                    "kind": "block",
                    "type": "logic_boolean"
                }
            ]
        },
        {
            kind: "category",
            name: "Loops",
            contents: [
                {
                    kind: "block",
                    type: "controls_repeat_ext",
                    values: {
                        TIMES: {
                            kind: "block",
                            type: "math_number",
                            fields: {
                                NUM: {
                                    kind: "field_number",
                                    value: 10
                                }
                            }
                        }
                    }
                },
                {
                    kind: "block",
                    type: "controls_whileUntil"
                }
            ]
        },
        {
            kind: "category",
            name: "Math",
            contents: [
                {
                    kind: "block",
                    type: "math_number",
                    fields: {
                        NUM: {
                            kind: "field_number",
                            value: 0
                        }
                    }
                },
                {
                    kind: "block",
                    type: "math_arithmetic",
                    fields: {
                        OP: {
                            kind: "field_dropdown",
                            value: "ADD"
                        }
                    },
                    values: {
                        A: {
                            kind: "block",
                            type: "math_number",
                            fields: {
                                NUM: {
                                    kind: "field_number",
                                    value: 1
                                }
                            }
                        },
                        B: {
                            kind: "block",
                            type: "math_number",
                            fields: {
                                NUM: {
                                    kind: "field_number",
                                    value: 2
                                }
                            }
                        }
                    }
                },
                {
                    kind: "block",
                    type: "math_single",
                    fields: {
                        OP: {
                            kind: "field_dropdown",
                            value: "ROOT"
                        }
                    },
                    values: {
                        NUM: {
                            kind: "block",
                            type: "math_number",
                            fields: {
                                NUM: {
                                    kind: "field_number",
                                    value: 9
                                }
                            }
                        }
                    }
                },
                {
                    kind: "block",
                    type: "math_trig",
                    fields: {
                        OP: {
                            kind: "field_dropdown",
                            value: "SIN"
                        }
                    },
                    values: {
                        NUM: {
                            kind: "block",
                            type: "math_number",
                            fields: {
                                NUM: {
                                    kind: "field_number",
                                    value: 45
                                }
                            }
                        }
                    }
                },
                {
                    kind: "block",
                    type: "math_constant",
                    fields: {
                        CONSTANT: {
                            kind: "field_dropdown",
                            value: "PI"
                        }
                    }
                },
                {
                    kind: "block",
                    type: "math_number_property",
                    fields: {
                        PROPERTY: {
                            kind: "field_dropdown",
                            value: "EVEN"
                        }
                    },
                    values: {
                        NUMBER_TO_CHECK: {
                            kind: "block",
                            type: "math_number",
                            fields: {
                                NUM: {
                                    kind: "field_number",
                                    value: 0
                                }
                            }
                        }
                    }
                },
                {
                    kind: "block",
                    type: "math_round",
                    fields: {
                        OP: {
                            kind: "field_dropdown",
                            value: "ROUND"
                        }
                    },
                }
            ]
        },
        {
            kind: "category",
            name: "Text",
            contents: [
                {
                    kind: "block",
                    type: "text"
                },
                {
                    kind: "block",
                    type: "text_length",
                    values: {
                        VALUE: {
                            kind: "block",
                            type: "text",
                            fields: {
                                TEXT: {
                                    kind: "field_input",
                                    value: "abc"
                                }
                            }
                        }
                    }
                },
                {
                    kind: "block",
                    type: "text_print",
                    values: {
                        TEXT: {
                            kind: "block",
                            type: "text",
                            fields: {
                                TEXT: {
                                    kind: "field_input",
                                    value: "abc"
                                }
                            }
                        }
                    }
                }
            ]
        },
        {
            kind: "category",
            name: "Lists",
            contents: [
                {
                    kind: "block",
                    type: "lists_create_with",
                    values: {
                        ADD0: {
                            kind: "block",
                            type: "text",
                            fields: {
                                TEXT: {
                                    kind: "field_input",
                                    value: "abc"
                                }
                            }
                        },
                        ADD1: {
                            kind: "block",
                            type: "text",
                            fields: {
                                TEXT: {
                                    kind: "field_input",
                                    value: "def"
                                }
                            }
                        }
                    }
                },
                {
                    kind: "block",
                    type: "lists_repeat",
                    values: {
                        NUM: {
                            kind: "block",
                            type: "math_number",
                            fields: {
                                NUM: {
                                    kind: "field_number",
                                    value: 5
                                }
                            }
                        },
                        VALUE: {
                            kind: "block",
                            type: "text",
                            fields: {
                                TEXT: {
                                    kind: "field_input",
                                    value: "abc"
                                }
                            }
                        }
                    }
                },
                {
                    kind: "block",
                    type: "lists_length",
                    values: {
                        VALUE: {
                            kind: "block",
                            type: "lists_create_with",
                            values: {
                                ADD0: {
                                    kind: "block",
                                    type: "text",
                                    fields: {
                                        TEXT: {
                                            kind: "field_input",
                                            value: "abc"
                                        }
                                    }
                                },
                                ADD1: {
                                    kind: "block",
                                    type: "text",
                                    fields: {
                                        TEXT: {
                                            kind: "field_input",
                                            value: "def"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        },
        {
            kind: "category",
            name: "Variables",
            custom: "VARIABLE",
            colour: "%{BKY_VARIABLES_HUE}"
        },
        {
            "kind": "category",
            "name": "Variables",
            "custom": "VARIABLE_DYNAMIC"
        },
        {
            "kind": "category",
            "name": "Functions",
            "custom": "PROCEDURE"
        },
        {
            kind: "category",
            name: "Jigsaw",
            colour: "%{BKY_LOOPS_HUE}",
            contents: [
                {
                    kind: "block",
                    type: "jigsaw_app"
                },
                {
                    kind: "block",
                    type: "jigsaw_text"
                },
                {
                    kind: "block",
                    type: "jigsaw_button"
                },
                {
                    kind: "block",
                    type: "jigsaw_flex"
                },
                {
                    kind: "block",
                    type: "jigsaw_input"
                }
            ]
        }
    ]
}