export interface BaseApiresponse {
    success : true,
    message : string
}

export interface ApiResponse<T> extends BaseApiresponse {
    data : T
}