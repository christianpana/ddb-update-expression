import {
    DynamoDBItem,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
    BuildDeepUpdateExpressionOptionsParam,
    UpdateExpressions,
    UpdateValue
} from "../types/ddb-update-expression.js";
import {isObject, normalizeName} from "./utils.js";

export const buildUpdateExpression = (item: DynamoDBItem): UpdateExpressions => {
    const params = {
        UpdateExpression: "",
        ExpressionAttributeNames: {},
        ExpressionAttributeValues: {},
    };

    params.UpdateExpression =
        "SET " +
        Object.keys(item)
            .map((field: string) => `#f_${field}=:v_${field}`)
            .join(",");

    params.ExpressionAttributeNames = Object.keys(item).reduce(
        (acc, field: string) => {
            acc[`#f_${field}`] = field;
            return acc;
        },
        {}
    );

    params.ExpressionAttributeValues = Object.keys(item).reduce(
        (acc, field: string) => {
            acc[`:v_${field}`] = item[field];
            return acc;
        },
        {}
    );

    return params
}

export const buildDeepUpdateExpression = (
    item: DynamoDBItem, 
    options?: BuildDeepUpdateExpressionOptionsParam
): UpdateExpressions => {
    const updateValues = options?.debug
        ? traverseTreeWithNames(item)
        : traverseTreeWithIDs(item)

    const ExpressionAttributeNames: ExpressionAttributeNames = {};
    const ExpressionAttributeValues: ExpressionAttributeValues = {};
    const UpdateExpression = [];

    for (const i of updateValues) {
        // we should at least have the name
        if (i.nameKey) {
            ExpressionAttributeNames[i.nameKey] = i.nameValue;
        }

        // we might not have values
        if (i.valueKey) {
            ExpressionAttributeValues[i.valueKey] = i.valueValue;
        }

        // we might not have an update expression
        if (i.updateKey) {
            UpdateExpression.push(`${i.updateKey}=${i.updateValue}`);
        }
    }

    return {
        ExpressionAttributeNames,
        ExpressionAttributeValues,
        UpdateExpression: `SET ${UpdateExpression.join(",")}`,
    };
}

export const traverseTreeWithIDs = (
    item: DynamoDBItem,
    id: number = 1
): UpdateValue[] => {
    const updateValues = [];

    if (!isObject(item)) {
        throw new Error("Invalid input received");
    }

    for (const [key, value] of Object.entries(item) as [string, DynamoDBItem][]) {
        if (isObject(value)) {
            // We have a nested object => traverse

            // Keep track of the parent field for the update expression
            const parentField = `#f${id}`;
            id++;

            // The parent attribute name (only) must be added to the list
            updateValues.push({
                nameKey: parentField,
                nameValue: key,
            });

            // Traverse nested
            const result = traverseTreeWithIDs(value, id);

            for (const r of result) {
                updateValues.push({
                    nameKey: r.nameKey,
                    nameValue: r.nameValue,
                    valueKey: r.valueKey,
                    valueValue: r.valueValue,
                    updateKey: r.updateKey
                        ? `${parentField}.${r.updateKey}`
                        : undefined,
                    updateValue: r.updateValue,
                });
            }
        } else {
            // We have primitives
            const k = `#f${id}`;
            const v = `:v${id}`;
            id++

            updateValues.push({
                nameKey: k,
                nameValue: key,
                valueKey: v,
                valueValue: value ?? "",
                updateKey: k,
                updateValue: v,
            });
        }
    }

    return updateValues;
};

// Should mostly be used only for debugging because payload might be too large for DynamoDB
// because of deeply nested elements
// TODO don't duplicate code just for debugging
export const traverseTreeWithNames = (
    item: DynamoDBItem,
    path: string[] = []
): UpdateValue[] => {
    const updateValues = [];

    if (!isObject(item)) {
        throw new Error("Invalid input received");
    }

    for (const [key, value] of Object.entries(item) as [string, DynamoDBItem][]) {
        const nestedPath = normalizeName([...path, key].join("_"));

        if (isObject(value)) {
            // We have a nested object => traverse

            // Keep track of the parent field for the update expression
            const parentField = `#f_${nestedPath}`;

            // The parent attribute name (only) must be added to the list
            updateValues.push({
                nameKey: parentField,
                nameValue: key,
            });

            // Traverse nested
            const result = traverseTreeWithNames(value, [...path, key]);

            for (const r of result) {
                updateValues.push({
                    nameKey: r.nameKey,
                    nameValue: r.nameValue,
                    valueKey: r.valueKey,
                    valueValue: r.valueValue,
                    updateKey: r.updateKey
                        ? `${parentField}.${r.updateKey}`
                        : undefined,
                    updateValue: r.updateValue,
                });
            }
        } else {
            // We have primitives
            const k = `#f_${nestedPath}`;
            const v = `:v_${nestedPath}`;

            updateValues.push({
                nameKey: k,
                nameValue: key,
                valueKey: v,
                valueValue: value ?? "",
                updateKey: k,
                updateValue: v,
            });
        }
    }

    return updateValues;
};