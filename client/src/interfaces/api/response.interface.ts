export interface BaseApiresponse {
    statusCode : true,
    message : string
}

export interface ApiResponse<T> extends BaseApiresponse {
    data : T
}