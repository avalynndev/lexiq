import "dotenv/config";
import { db } from "@/db";
import { prompt, user } from "@/schema";
import { eq } from "drizzle-orm";

async function seed() {
  try {
    // Check if user already exists, if not create one
    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.id, "admin-user-id"))
      .limit(1);

    if (existingUser.length === 0) {
      const sampleUser = await db
        .insert(user)
        .values({
          id: "admin-user-id",
          name: "Admin User",
          email: "admin@example.com",
          username: "admin",
          displayUsername: "Admin",
          image:
            "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100",
        })
        .returning();

      console.log("Created sample user:", sampleUser[0]);
    } else {
      console.log("User already exists, skipping user creation");
    }

    // Clear existing prompts and recreate them
    await db.delete(prompt);
    console.log("Cleared existing prompts");

    // Create sample prompts
    const samplePrompts = [
      {
        id: "prompt-1",
        title: "Creative Writing Assistant",
        description:
          "A comprehensive prompt for generating creative stories, novels, and screenplay content with character development guidance.",
        prompt: `You are a creative writing assistant. Help me create compelling stories with the following guidelines:

1. Develop rich, three-dimensional characters with clear motivations
2. Create engaging plot structures with proper pacing
3. Use vivid, sensory descriptions to immerse readers
4. Balance dialogue and narration effectively
5. Include meaningful themes and character arcs

Please help me write a story about: [USER'S STORY IDEA]`,
        model: "GPT-4",
        category: "Writing",
        stars: 1247,
        forks: 89,
        tags: ["gpt-4", "writing", "creative", "storytelling"],
        solves:
          "Generate compelling creative content with structured character development",
        models: ["GPT-4", "Claude"],
        authorId: "admin-user-id",
        createdOn: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: "prompt-2",
        title: "Code Review & Optimization",
        description:
          "Detailed prompt for analyzing code quality, suggesting improvements, and identifying potential bugs across multiple languages.",
        prompt: `You are an expert code reviewer and optimization specialist. Please analyze the following code and provide:

1. **Code Quality Assessment**: Identify potential issues, bugs, and anti-patterns
2. **Performance Optimization**: Suggest improvements for efficiency and speed
3. **Security Review**: Check for vulnerabilities and security best practices
4. **Best Practices**: Recommend improvements for maintainability and readability
5. **Specific Improvements**: Provide concrete code examples and refactoring suggestions

Code to review:
\`\`\`
[USER'S CODE HERE]
\`\`\`

Please provide a detailed analysis with actionable recommendations.`,
        model: "Claude",
        category: "Development",
        stars: 892,
        forks: 156,
        tags: ["claude", "development", "code-review", "optimization"],
        solves: "Automated code analysis and improvement suggestions",
        models: ["Claude", "GPT-4", "Gemini"],
        authorId: "admin-user-id",
        createdOn: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
        lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
      {
        id: "prompt-3",
        title: "Data Analysis Wizard",
        description:
          "Advanced prompt for interpreting datasets, creating visualizations, and generating actionable business insights.",
        prompt: `You are a data analysis expert. Please analyze the following dataset and provide:

1. **Data Overview**: Summary statistics and key insights
2. **Pattern Recognition**: Identify trends, correlations, and anomalies
3. **Visualization Recommendations**: Suggest appropriate charts and graphs
4. **Business Insights**: Extract actionable recommendations
5. **Statistical Analysis**: Perform relevant statistical tests if applicable

Dataset:
[USER'S DATA HERE]

Please provide a comprehensive analysis with clear, actionable insights.`,
        model: "Gemini",
        category: "Analytics",
        stars: 567,
        forks: 43,
        tags: ["gemini", "analytics", "data-science", "visualization"],
        solves: "Transform raw data into actionable business insights",
        models: ["Gemini", "GPT-4"],
        authorId: "admin-user-id",
        createdOn: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        id: "prompt-4",
        title: "SEO Content Generator",
        description:
          "Optimize your content for search engines with this comprehensive SEO-focused writing prompt.",
        prompt: `You are an SEO content specialist. Help me create search-optimized content with:

1. **Keyword Research**: Identify primary and secondary keywords
2. **Content Structure**: Create SEO-friendly headings and structure
3. **Meta Descriptions**: Write compelling meta descriptions
4. **Internal Linking**: Suggest relevant internal links
5. **Content Optimization**: Ensure proper keyword density and readability

Topic: [USER'S TOPIC]
Target Keywords: [USER'S KEYWORDS]

Please create SEO-optimized content that ranks well and provides value to readers.`,
        model: "GPT-4",
        category: "Marketing",
        stars: 743,
        forks: 67,
        tags: ["gpt-4", "marketing", "seo", "content"],
        solves: "Create search-optimized content that ranks and converts",
        models: ["GPT-4"],
        authorId: "admin-user-id",
        createdOn: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: "prompt-5",
        title: "Educational Lesson Planner",
        description:
          "Create engaging lesson plans and educational content tailored to different learning styles and age groups.",
        prompt: `You are an educational expert. Help me create engaging lesson plans with:

1. **Learning Objectives**: Clear, measurable goals
2. **Engagement Strategies**: Activities for different learning styles
3. **Assessment Methods**: Ways to measure understanding
4. **Differentiation**: Adaptations for various skill levels
5. **Technology Integration**: Digital tools and resources

Subject: [SUBJECT]
Grade Level: [GRADE]
Topic: [TOPIC]

Please create a comprehensive lesson plan that engages all learners.`,
        model: "Claude",
        category: "Education",
        stars: 423,
        forks: 28,
        tags: ["claude", "education", "lesson-planning", "teaching"],
        solves: "Design effective educational content for diverse learners",
        models: ["Claude", "GPT-4"],
        authorId: "admin-user-id",
        createdOn: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        id: "prompt-6",
        title: "Product Description Master",
        description:
          "Generate compelling product descriptions that convert visitors into customers with psychological triggers.",
        prompt: `You are a conversion copywriting expert. Help me create compelling product descriptions with:

1. **Benefit-Focused Headlines**: Highlight key value propositions
2. **Emotional Triggers**: Use psychological principles to connect
3. **Social Proof Elements**: Include testimonials and reviews
4. **Urgency and Scarcity**: Create compelling calls-to-action
5. **Feature-Benefit Translation**: Turn features into customer benefits

Product: [PRODUCT NAME]
Target Audience: [AUDIENCE]
Key Features: [FEATURES]

Please create a product description that drives sales and engagement.`,
        model: "Llama",
        category: "E-commerce",
        stars: 856,
        forks: 94,
        tags: ["llama", "e-commerce", "copywriting", "conversion"],
        solves: "Write product descriptions that drive sales and engagement",
        models: ["Llama", "GPT-4", "Claude"],
        authorId: "admin-user-id",
        createdOn: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        lastUpdated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      },
    ];

    for (const promptData of samplePrompts) {
      await db.insert(prompt).values(promptData);
      console.log(`Created prompt: ${promptData.title}`);
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();
