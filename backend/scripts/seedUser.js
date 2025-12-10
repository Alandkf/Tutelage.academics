// =============================================================================
// SEED USER SCRIPT - Create default admin user
// =============================================================================
// Creates a single admin user for initial setup and testing
// Email: seed-admin@gmail.com
// Password: password123
// =============================================================================

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const bcrypt = require('bcrypt');
const { User } = require('../models');

const BCRYPT_ROUNDS = 10;

/**
 * Seed default admin user
 * Creates an admin user with predefined credentials
 */
async function seedAdminUser() {
  try {
    console.log('👤 Starting admin user seeding process...');
    
    const email = 'seed-admin@gmail.com';
    const password = 'password123';
    const name = 'Seed Admin';
    const role = 'ADMIN';
    
    // Check if admin user already exists
    const existingUser = await User.findOne({ where: { email } });
    
    if (existingUser) {
      console.log('⚠️  Admin user already exists with email:', email);
      console.log('✅ Using existing admin user (ID:', existingUser.id, ')');
      return existingUser;
    }
    
    // Hash the password
    console.log('🔐 Hashing password...');
    const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
    
    // Create the admin user
    console.log('📝 Creating admin user...');
    const adminUser = await User.create({
      name,
      email,
      passwordHash,
      role,
      isActive: true
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', email);
    console.log('🔑 Password: password123');
    console.log('👤 ID:', adminUser.id);
    console.log('🎭 Role:', adminUser.role);
    
    return adminUser;
    
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
    throw error;
  }
}

/**
 * Main function to run seeding
 */
async function main() {
  try {
    console.log('🚀 Starting user seeding...\n');
    
    const admin = await seedAdminUser();
    
    console.log('\n🎉 User seeding completed successfully!');
    console.log('=' .repeat(50));
    console.log('LOGIN CREDENTIALS:');
    console.log('Email: seed-admin@gmail.com');
    console.log('Password: password123');
    console.log('=' .repeat(50));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main();
}

// Export for use in other scripts
module.exports = { seedAdminUser, main };
