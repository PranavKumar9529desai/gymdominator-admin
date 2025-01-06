// ...existing code...
ownerRouter.get("todaysattendance", async (c) => {
  const adapter = new PrismaD1(c.env.DB);
  const prisma = new PrismaClient({ adapter });
  // @ts-ignore
  const { email } = c.get("auth");
  try {
    const owner = await prisma.owner.findFirst({
      where: { email: email },
      select: { gym_id: true },
    });

    if (!owner) {
      c.status(400);
      return c.json({ msg: "Owner not found" });
    }

    const users = await prisma.user.findMany({
      where: { gym_id: owner.gym_id },
      select: {
        id: true,
        name: true,
        Validperiod: true,
        trainerid: true,
      },
    });

    // Create today's date range in IST
    const todayIST = new Date();
    todayIST.setHours(todayIST.getHours() + 5); // Add 5 hours
    todayIST.setMinutes(todayIST.getMinutes() + 30); // Add 30 minutes
    
    const startOfDay = new Date(todayIST);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(todayIST);
    endOfDay.setHours(23, 59, 59, 999);

    const usersWithAttendance = await Promise.all(
      users.map(async (user) => {
        const attendance = await prisma.attendance.findMany({
          where: {
            userId: user.id,
            scanTime: {
              gte: startOfDay,
              lte: endOfDay,
            },
          },
          select: {
            id: true,
            scanTime: true,
          },
          orderBy: {
            scanTime: 'asc'
          },
          take: 1
        });

        return {
          id: user.id,
          name: user.name,
          isPresent: attendance.length > 0,
          trainerid: user.trainerid,
          attendanceTime: attendance[0]?.scanTime || null,
        };
      })
    );

    console.log("users with attendance are ", usersWithAttendance);
    c.status(200);
    return c.json({
      msg: "success",
      users: usersWithAttendance,
    });
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    c.status(500);
    return c.json({ msg: "Internal server error" });
  }
});
// ...existing code...
