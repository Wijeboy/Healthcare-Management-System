import prisma from '../../config/prisma.js';

export const getSettings = async (req, res) => {
  try {
    const settings = await prisma.systemSetting.findMany();
    // Convert array to an object map for easier frontend usage
    const settingsMap = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {});
    
    res.json(settingsMap);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const updates = req.body; // Expecting an object of key-value pairs
    
    // Update or create each setting
    const promises = Object.keys(updates).map(key => {
      return prisma.systemSetting.upsert({
        where: { key },
        update: { value: updates[key].toString() },
        create: { key, value: updates[key].toString() }
      });
    });

    await Promise.all(promises);
    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getConfig = async (req, res) => {
  try {
    // Similar to getSettings but might return only public/client-facing settings
    const settings = await prisma.systemSetting.findMany();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
