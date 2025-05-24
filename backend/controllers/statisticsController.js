import PrintRequest from '../models/PrintRequest.js';
import Department from '../models/Department.js';
import CostSettings from '../models/CostSettings.js';
import moment from 'moment';
import mongoose from 'mongoose';

// Get all statistics for a user (admin or department)
export const  getStatistics =  async (req, res)=> {
  try {
    const { timeRange = 'month' } = req.query;
    const { facultyId, departmentId, role } = req.user;

    // Get cost settings
    const costSettings = await CostSettings.findOne({ facultyId }) || {
      printCost: 5,
      paperCost: 2
    };

    // Get date ranges for all periods
    const dateRanges = getDateRanges(timeRange);
    
    // Build query based on user role
    const query = { facultyId };
    if (role === 'department') {
      query.departmentId = departmentId;
    }

    // Get all completed requests for the date range
    const requests = await PrintRequest.find({
      ...query,
      status: 'completed',
      createdAt: {
        $gte: dateRanges[Object.keys(dateRanges)[Object.keys(dateRanges).length - 1]].start,
        $lte: dateRanges[Object.keys(dateRanges)[0]].end
      }
    });

    // Calculate statistics for each period
    const statistics = Object.entries(dateRanges).map(([period, { start, end }]) => {
      const periodRequests = requests.filter(req => 
        req.createdAt >= start && req.createdAt <= end
      );

      const totalPapers = periodRequests.reduce((sum, req) => sum + (req.quantity || 0), 0);
      const totalRequests = periodRequests.length;

      return {
        period,
        metrics: {
          totalPapers,
          totalRequests,
          completedRequests: totalRequests,
          printCost: totalPapers * costSettings.printCost,
          paperCost: totalPapers * costSettings.paperCost,
          totalCost: totalPapers * (costSettings.printCost + costSettings.paperCost)
        }
      };
    });

    // Get department statistics
    const departmentStats = await Department.aggregate([
      { $match: { facultyId: new mongoose.Types.ObjectId(facultyId) } },
      {
        $lookup: {
          from: 'printrequests',
          let: { deptId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$departmentId', '$$deptId'] },
                    { $eq: ['$status', 'completed'] },
                    { $gte: ['$createdAt', dateRanges[Object.keys(dateRanges)[Object.keys(dateRanges).length - 1]].start] },
                    { $lte: ['$createdAt', dateRanges[Object.keys(dateRanges)[0]].end] }
                  ]
                }
              }
            }
          ],
          as: 'requests'
        }
      },
      {
        $project: {
          department: '$name',
          papers: {
            $reduce: {
              input: '$requests',
              initialValue: 0,
              in: { $add: ['$$value', { $ifNull: ['$$this.quantity', 0] }] }
            }
          }
        }
      }
    ]);

    // Get status distribution
    const statusDistribution = await PrintRequest.aggregate([
      {
        $match: {
          ...query,
          createdAt: {
            $gte: dateRanges[Object.keys(dateRanges)[Object.keys(dateRanges).length - 1]].start,
            $lte: dateRanges[Object.keys(dateRanges)[0]].end
          }
        }
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $eq: ['$status', 'pending'] }, then: 'Pending' },
                { case: { $in: ['$status', ['wf_printer', 'wf_teacher']] }, then: 'In Progress' },
                { case: { $eq: ['$status', 'completed'] }, then: 'Completed' },
                { case: { $eq: ['$status', 'refused'] }, then: 'Refused' }
              ],
              default: 'Other'
            }
          },
          value: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          status: '$_id',
          value: 1
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        statistics,
        departmentStats,
        statusDistribution
      }
    });
  } catch (error) {
    console.error('Error in getStatistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
}

// Update cost settings
export const updateCostSettings = async (req, res) => {
  try {
    const { facultyId } = req.user;
    const { printCost, paperCost } = req.body;

    let costSettings = await CostSettings.findOneAndUpdate(
      { facultyId },
      { printCost, paperCost },
      { upsert: true, new: true }
    );

    if(!costSettings){
      costSettings = await CostSettings.create({
        facultyId,
        printCost,
        paperCost
      })
    }

    res.json({
      success: true,
      data: costSettings
    });
  } catch (error) {
    console.error('Error in updateCostSettings:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating cost settings',
      error: error.message
    });
  }
}

// Helper function to get date ranges for all periods
function getDateRanges(timeRange) {
  const ranges = {};
  const now = moment();

  switch (timeRange) {
    case 'month':
      // Get last 6 months
      for (let i = 0; i < 6; i++) {
        const date = moment().subtract(i, 'months');
        ranges[date.format('YYYY-MM')] = {
          start: date.startOf('month').toDate(),
          end: date.endOf('month').toDate()
        };
      }
      break;
    case 'week':
      // Get last 4 weeks
      for (let i = 0; i < 4; i++) {
        const date = moment().subtract(i, 'weeks');
        ranges[date.format('YYYY-[W]WW')] = {
          start: date.startOf('week').toDate(),
          end: date.endOf('week').toDate()
        };
      }
      break;
    case 'day':
      // Get last 7 days
      for (let i = 0; i < 7; i++) {
        const date = moment().subtract(i, 'days');
        ranges[date.format('YYYY-MM-DD')] = {
          start: date.startOf('day').toDate(),
          end: date.endOf('day').toDate()
        };
      }
      break;
  }

  return ranges;
}
