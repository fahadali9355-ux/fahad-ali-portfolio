import { NextResponse } from 'next/server';

// Optional cache duration (revalidate every hour)
export const revalidate = 3600; 

export async function GET() {
  try {
    const githubUsername = process.env.GITHUB_USERNAME; // define this in .env.local
    if (!githubUsername) {
      return NextResponse.json({ error: 'GITHUB_USERNAME not configured.' }, { status: 500 });
    }

    // Fetch directly from github API
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_PAT && { 'Authorization': `token ${process.env.GITHUB_PAT}` })
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }

    const repos = await response.json();
    
    // Map response to simplified format
    const formattedRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description provided.',
      url: repo.html_url,
      language: repo.language || 'Unknown',
      stars: repo.stargazers_count,
    }));

    return NextResponse.json({ repos: formattedRepos });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error fetching repos' }, { status: 500 });
  }
}
