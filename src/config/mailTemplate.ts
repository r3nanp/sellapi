import handlebars from 'handlebars'
import fs from 'fs/promises'

interface TemplateVariable {
  [key: string]: string | number
}

export interface IParseMailTemplate {
  file: string
  variables: TemplateVariable
}

export class MailTemplate {
  async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.readFile(file, {
      encoding: 'utf-8'
    })

    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables)
  }
}
