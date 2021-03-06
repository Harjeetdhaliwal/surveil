const express = require("express");
const Sequelize = require("sequelize");
const withUser = require("../middleware/withUser");
const { NotFoundError } = require("../errors");
const {
  prepareUserForOutput,
  prepareTeamForOutput,
} = require("../helpers/prepareForOutput");
const { User, Team, ActivityStream } = require("../models");

const router = express.Router();

// GET /api/teams
router.get("/", withUser, async function(req, res) {
  const myUser = req.myUser;
  const whereClauses = {};
  
  if (!req.myUser.isAdmin) {
    whereClauses.managerId = myUser.id;
  }

  const teams = await Team.findAll({
    where: whereClauses,
  });

  res.json(teams.map(prepareTeamForOutput));
});

// GET /api/teams/:team_id
router.get("/:team_id", withUser, async function(req, res) {
  const myUser = req.myUser;
  const teamId = req.params.team_id;
  const whereClauses = { id: teamId };

  // A manager should only be able to see their own teams
  if (!myUser.isAdmin) {
    whereClauses.managerId = myUser.id;
  }

  // Query for the desired team but make sure they have permissions to access it
  let team = await Team.findOne({
    where: whereClauses,
    raw: true,
  });
  if (!team) {
    throw new NotFoundError(`Could not find team with id ${teamId}!`);
  }

  // Query all members on the team
  const members = await User.findAll({
    where: { teamId },
    raw: true,
    attributes: { exclude: [ "teamId", "isAdmin", "isManager" ] },
  });

  // Find number of sites visited by any member of the team and total time spent on any of them
  const { totalTimeSpent } = await ActivityStream.findOne({
    attributes: [
      [Sequelize.literal('SUM(EXTRACT(EPOCH FROM ("endTime" - "startTime")))'), "totalTimeSpent"],
    ],
    raw: true,
  });

  const totalSites = await ActivityStream.count({
    include: [{ model: User, where: { teamId } }],
    distinct: true,
    col: "name",
    raw: true,
  });
  
  res.json({
    ...prepareTeamForOutput(team),
    /* eslint-disable camelcase */
    total_time: totalTimeSpent,
    total_sites: totalSites,
    total_users: members.length,
    /* eslint-enable camelcase */
    members: members.map(prepareUserForOutput)
  });
});

// POST /api/teams
router.post("/", async function(req, res) {
  /* eslint-disable camelcase */
  const {
    manager_id: managerId,
    name,
  } = req.body;
  /* eslint-disable camelcase */

  const newTeam = await Team.create({
    managerId,
    name,
    raw: true
  });

  res.json(prepareTeamForOutput(newTeam));
});


module.exports = router;
