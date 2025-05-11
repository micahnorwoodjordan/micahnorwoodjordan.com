export interface TextDecryptionVisualEffectMapping {
        // an interface to help simplify the usage of the AnimationService's `applyDecryptionEffectToMarkupText`
        // the idea is to iterate over an Array<Object<TextDecryptionVisualEffectMapping>>
        // where each TextDecryptionVisualEffectMapping object can be directly referenced in a template
        // This is in contrast to padding a class' definition with 3 members for every string that i call the decryption visual effect on:
        //      1 target string member
        //      1 encrypted string member
        //      1 decrypted string member
        // example:
                // textObjectClassMember1: TextDecryptionVisualEffectMapping = {
                //         targetString: "a string to which i want to apply the decryption visual effect",
                //         encryptedString: "",
                //         decryptedString: ""
                // };
                // textObjectClassMember2: TextDecryptionVisualEffectMapping = {
                //         targetString: "another string to which i want to apply the decryption visual effect",
                //         encryptedString: "",
                //         decryptedString: ""
                // };
        targetString: string,
        encryptedString: string,
        decryptedString: string
}
