import { CommitType } from "../types";

// Regex para analisar mensagens de commit convencional.
// Captura: tipo, escopo (opcional), indicador de breaking change '!' (opcional) e mensagem.
const CONVENTIONAL_COMMIT_REGEX = /^(?<type>\w+)(?:\((?<scope>[\w-]+)\))?(?<breaking>!)?: (?<message>.*)$/;


export function parseConventionalCommit(message: string) {
    const subject = message.split('\n')[0]; // Analisa apenas a primeira linha
    const match = subject.match(CONVENTIONAL_COMMIT_REGEX);

    if (!match || !match.groups) {
        return {
            type: CommitType.CHORE, // Padrão para chore se a análise falhar
            scope: undefined,
            message: subject, // Retorna o assunto original
            breaking: message.includes('BREAKING CHANGE'),
        };
    }

    const { type, scope, breaking, message: parsedMessage } = match.groups;
    
    // Garante que o tipo analisado é um CommitType válido
    const isValidType = Object.values(CommitType).includes(type as CommitType);

    return {
        type: isValidType ? (type as CommitType) : CommitType.CHORE,
        scope: scope || undefined,
        message: parsedMessage.trim(),
        breaking: !!breaking || message.includes('BREAKING CHANGE'),
    };
}
