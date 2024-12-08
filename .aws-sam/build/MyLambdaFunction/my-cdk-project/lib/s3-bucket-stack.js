"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3BucketStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
//import the s3
class S3BucketStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        //code that definees your stacck goes here
        this.bucket = new s3.Bucket(this, "ecp-bucket-dev3", {
            versioned: false,
            bucketName: "ecp-bucket-dev3",
            publicReadAccess: false,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY
        });
    }
}
exports.S3BucketStack = S3BucketStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiczMtYnVja2V0LXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiczMtYnVja2V0LXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDZDQUE4RDtBQUU5RCx5Q0FBeUM7QUFFekMsZUFBZTtBQUVmLE1BQWEsYUFBYyxTQUFRLG1CQUFLO0lBR3RDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsMENBQTBDO1FBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxpQkFBaUIsRUFBQztZQUMvQyxTQUFTLEVBQUMsS0FBSztZQUNmLFVBQVUsRUFBRSxpQkFBaUI7WUFDN0IsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixpQkFBaUIsRUFBRSxFQUFFLENBQUMsaUJBQWlCLENBQUMsU0FBUztZQUNqRCxhQUFhLEVBQUUsMkJBQWEsQ0FBQyxPQUFPO1NBQ3ZDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQWZELHNDQWVDIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCB7UmVtb3ZhbFBvbGljeSwgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XHJcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xyXG5pbXBvcnQgKiBhcyBzMyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xyXG5cclxuLy9pbXBvcnQgdGhlIHMzXHJcblxyXG5leHBvcnQgY2xhc3MgUzNCdWNrZXRTdGFjayBleHRlbmRzIFN0YWNrIHtcclxuICAgIHB1YmxpYyByZWFkb25seSBidWNrZXQ6IHMzLkJ1Y2tldDtcclxuXHJcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XHJcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcclxuXHJcbiAgICAvL2NvZGUgdGhhdCBkZWZpbmVlcyB5b3VyIHN0YWNjayBnb2VzIGhlcmVcclxuICAgIHRoaXMuYnVja2V0ID0gbmV3IHMzLkJ1Y2tldCh0aGlzLFwiZWNwLWJ1Y2tldC1kZXYzXCIse1xyXG4gICAgICAgIHZlcnNpb25lZDpmYWxzZSxcclxuICAgICAgICBidWNrZXROYW1lOiBcImVjcC1idWNrZXQtZGV2M1wiLFxyXG4gICAgICAgIHB1YmxpY1JlYWRBY2Nlc3M6IGZhbHNlLFxyXG4gICAgICAgIGJsb2NrUHVibGljQWNjZXNzOiBzMy5CbG9ja1B1YmxpY0FjY2Vzcy5CTE9DS19BTEwsXHJcbiAgICAgICAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZXHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19