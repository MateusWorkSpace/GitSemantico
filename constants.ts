import { CommitType } from './types';

export const COMMIT_TYPE_DETAILS: Record<CommitType, { label: string; color: string; description: string }> = {
    [CommitType.FEAT]: { label: 'Feature', color: 'bg-blue-500/20 text-blue-300', description: 'A new feature for the user.' },
    [CommitType.FIX]: { label: 'Fix', color: 'bg-green-500/20 text-green-300', description: 'A bug fix.' },
    [CommitType.CHORE]: { label: 'Chore', color: 'bg-gray-500/20 text-gray-400', description: 'Routine tasks, maintenance.' },
    [CommitType.DOCS]: { label: 'Docs', color: 'bg-purple-500/20 text-purple-300', description: 'Documentation only changes.' },
    [CommitType.STYLE]: { label: 'Style', color: 'bg-pink-500/20 text-pink-300', description: 'Code style changes (formatting, etc).' },
    [CommitType.REFACTOR]: { label: 'Refactor', color: 'bg-yellow-500/20 text-yellow-300', description: 'A code change that neither fixes a bug nor adds a feature.' },
    [CommitType.PERF]: { label: 'Perf', color: 'bg-teal-500/20 text-teal-300', description: 'A code change that improves performance.' },
    [CommitType.TEST]: { label: 'Test', color: 'bg-orange-500/20 text-orange-300', description: 'Adding missing tests or correcting existing tests.' },
    [CommitType.BUILD]: { label: 'Build', color: 'bg-indigo-500/20 text-indigo-300', description: 'Changes that affect the build system or external dependencies.' },
    [CommitType.CI]: { label: 'CI', color: 'bg-cyan-500/20 text-cyan-300', description: 'Changes to our CI configuration files and scripts.' },
}
