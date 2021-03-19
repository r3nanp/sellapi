export interface Service<IRequest, IResponse> {
  execute(request?: IRequest): Promise<IRequest | IResponse>
}
