import { TeamMemberForTeamPage } from "./TeamMemberForTeamPage"
import { TeamMember } from "./teamMember"

export class Team {
    id: string
    teamName: string
    discription: string
    Status: boolean
    createdAt: string
    teamMemmbers: TeamMemberForTeamPage[];
    userId: string;
    companyId: string;
}