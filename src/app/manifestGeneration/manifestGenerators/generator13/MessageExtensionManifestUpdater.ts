// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IManifestUpdater } from "../../IManifestUpdater";
import { GeneratorTeamsAppOptions } from "../../../GeneratorTeamsAppOptions";

export class MessageExtensionManifestUpdater implements IManifestUpdater {

    public updateManifest(manifest: any, options: GeneratorTeamsAppOptions): void {
        if (!manifest.composeExtensions) {
            manifest.composeExtensions = [];
        }

        let command = {
            id: options.messageExtensionName,
            title: options.messageExtensionTitle,
            description: 'Add a clever description here',
            initialRun: true,
            parameters: [
                {
                    name: 'parameter',
                    description: 'Description of the parameter',
                    title: 'Parameter'
                }
            ]
        };

        let composeExtension = manifest.composeExtensions.find((ce: { botId: string; }) => ce.botId == options.messageExtensionId);
        if (options.existingManifest && composeExtension) {
            if(options.messagingExtensionCanUpdateConfiguration){
                // if we have config for this one, it has to be positioned as the first one
                composeExtension.commands.unshift(command);
                composeExtension.canUpdateConfiguration =  options.messagingExtensionCanUpdateConfiguration;
            } else {
                composeExtension.commands.push(command);
            }
        } else {
            // no existing manifest
            manifest.composeExtensions.push({
                botId: options.messageExtensionId,
                canUpdateConfiguration: options.messagingExtensionCanUpdateConfiguration,
                commands: [command]
            });
        }
    }
}