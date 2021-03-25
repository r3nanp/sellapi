import handlebars from 'handlebars'

interface TemplateVariable {
  [key: string]: string | number
}

export interface IParseMailTemplate {
  template: string
  variables: TemplateVariable
}

export class MailTemplate {
  async parse({ template, variables }: IParseMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template)

    return parseTemplate(variables)
  }
}
