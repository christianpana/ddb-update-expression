import {
    buildUpdateExpression as ddbUpdateExpression,
    buildDeepUpdateExpression as ddbDeepUpdateExpression,
    traverseTreeWithIDs,
    traverseTreeWithNames
} from './ddb-update.js'

export {
    ddbUpdateExpression,
    ddbDeepUpdateExpression,
    traverseTreeWithIDs,
    traverseTreeWithNames,
}

export default ddbDeepUpdateExpression