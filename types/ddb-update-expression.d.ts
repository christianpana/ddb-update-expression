export type DynamoDBItem = {
    [key: string]: string | number | boolean | DynamoDBItem;
}

export type UpdateValue = {
    nameKey: string;
    nameValue: string;
    valueKey?: string;
    valueValue?: string | number | boolean;
    updateKey?: string;
    updateValue?: string;
};

export type ExpressionAttributeNames = {
    [key: string]: string
}

export type ExpressionAttributeValues = {
    [key: string]: string|number|boolean|ExpressionAttributeValues
}

export type UpdateExpressions = {
    UpdateExpression: string
    ExpressionAttributeNames: ExpressionAttributeNames
    ExpressionAttributeValues: ExpressionAttributeValues
}

export type BuildDeepUpdateExpressionOptionsParam = {
    debug?: boolean
}