const BASE = 'https://community.voltexahub.com'

export const endpointGroups = [
  {
    name: 'Authentication',
    id: 'authentication',
    endpoints: [
      {
        method: 'POST',
        path: '/api/auth/register',
        id: 'auth-register',
        description: 'Register a new user account.',
        auth: false,
        params: [
          { name: 'username', location: 'body', type: 'string', required: true, description: 'Unique username (3-20 chars)' },
          { name: 'email', location: 'body', type: 'string', required: true, description: 'Valid email address' },
          { name: 'password', location: 'body', type: 'string', required: true, description: 'Password (min 8 chars)' },
          { name: 'password_confirmation', location: 'body', type: 'string', required: true, description: 'Must match password' },
        ],
        exampleRequest: {
          curl: `curl -X POST ${BASE}/api/auth/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "securePass123!",
    "password_confirmation": "securePass123!"
  }'`,
          js: `const { data } = await axios.post('${BASE}/api/auth/register', {
  username: 'newuser',
  email: 'newuser@example.com',
  password: 'securePass123!',
  password_confirmation: 'securePass123!'
});`,
        },
        exampleResponse: `{
  "message": "Registration successful. Please check your email to verify your account.",
  "user": {
    "id": 42,
    "username": "newuser",
    "email": "newuser@example.com",
    "created_at": "2025-09-15T10:30:00.000Z"
  }
}`,
      },
      {
        method: 'POST',
        path: '/api/auth/login',
        id: 'auth-login',
        description: 'Authenticate a user and receive a Bearer token. Tokens expire after 30 days.',
        auth: false,
        params: [
          { name: 'email', location: 'body', type: 'string', required: true, description: 'Account email address' },
          { name: 'password', location: 'body', type: 'string', required: true, description: 'Account password' },
          { name: 'mfa_code', location: 'body', type: 'string', required: false, description: 'MFA code if MFA is enabled' },
        ],
        exampleRequest: {
          curl: `curl -X POST ${BASE}/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "user@example.com",
    "password": "securePass123!"
  }'`,
          js: `const { data } = await axios.post('${BASE}/api/auth/login', {
  email: 'user@example.com',
  password: 'securePass123!'
});`,
        },
        exampleResponse: `{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "type": "bearer",
  "expires_at": "2025-10-15T10:30:00.000Z",
  "user": {
    "id": 1,
    "username": "voltexauser",
    "email": "user@example.com",
    "role": "member"
  }
}`,
      },
      {
        method: 'POST',
        path: '/api/auth/logout',
        id: 'auth-logout',
        description: 'Invalidate the current Bearer token and end the session.',
        auth: true,
        params: [],
        exampleRequest: {
          curl: `curl -X POST ${BASE}/api/auth/logout \\
  -H "Authorization: Bearer {token}"`,
          js: `const { data } = await axios.post('${BASE}/api/auth/logout', null, {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "message": "Successfully logged out."
}`,
      },
      {
        method: 'POST',
        path: '/api/auth/forgot-password',
        id: 'auth-forgot-password',
        description: 'Send a password reset link to the given email address.',
        auth: false,
        params: [
          { name: 'email', location: 'body', type: 'string', required: true, description: 'Email associated with the account' },
        ],
        exampleRequest: {
          curl: `curl -X POST ${BASE}/api/auth/forgot-password \\
  -H "Content-Type: application/json" \\
  -d '{ "email": "user@example.com" }'`,
          js: `const { data } = await axios.post('${BASE}/api/auth/forgot-password', {
  email: 'user@example.com'
});`,
        },
        exampleResponse: `{
  "message": "If an account with that email exists, a reset link has been sent."
}`,
      },
      {
        method: 'POST',
        path: '/api/auth/reset-password',
        id: 'auth-reset-password',
        description: 'Reset password using the token from the forgot-password email.',
        auth: false,
        params: [
          { name: 'token', location: 'body', type: 'string', required: true, description: 'Password reset token from email' },
          { name: 'password', location: 'body', type: 'string', required: true, description: 'New password (min 8 chars)' },
          { name: 'password_confirmation', location: 'body', type: 'string', required: true, description: 'Must match new password' },
        ],
        exampleRequest: {
          curl: `curl -X POST ${BASE}/api/auth/reset-password \\
  -H "Content-Type: application/json" \\
  -d '{
    "token": "abc123resettoken",
    "password": "newSecurePass!",
    "password_confirmation": "newSecurePass!"
  }'`,
          js: `const { data } = await axios.post('${BASE}/api/auth/reset-password', {
  token: 'abc123resettoken',
  password: 'newSecurePass!',
  password_confirmation: 'newSecurePass!'
});`,
        },
        exampleResponse: `{
  "message": "Password has been reset successfully."
}`,
      },
      {
        method: 'GET',
        path: '/api/auth/sessions',
        id: 'auth-sessions',
        description: 'List all active sessions for the authenticated user.',
        auth: true,
        params: [],
        exampleRequest: {
          curl: `curl ${BASE}/api/auth/sessions \\
  -H "Authorization: Bearer {token}"`,
          js: `const { data } = await axios.get('${BASE}/api/auth/sessions', {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "sessions": [
    {
      "id": "tok_a1b2c3",
      "ip_address": "192.168.1.1",
      "user_agent": "Mozilla/5.0...",
      "last_active": "2025-09-15T10:30:00.000Z",
      "is_current": true
    },
    {
      "id": "tok_d4e5f6",
      "ip_address": "10.0.0.5",
      "user_agent": "PostmanRuntime/7.29",
      "last_active": "2025-09-14T08:00:00.000Z",
      "is_current": false
    }
  ]
}`,
      },
      {
        method: 'DELETE',
        path: '/api/auth/sessions/{tokenId}',
        id: 'auth-sessions-revoke',
        description: 'Revoke a specific session by its token ID.',
        auth: true,
        params: [
          { name: 'tokenId', location: 'path', type: 'string', required: true, description: 'Session token ID to revoke' },
        ],
        exampleRequest: {
          curl: `curl -X DELETE ${BASE}/api/auth/sessions/tok_d4e5f6 \\
  -H "Authorization: Bearer {token}"`,
          js: `const { data } = await axios.delete('${BASE}/api/auth/sessions/tok_d4e5f6', {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "message": "Session revoked successfully."
}`,
      },
      {
        method: 'DELETE',
        path: '/api/auth/sessions',
        id: 'auth-sessions-revoke-all',
        description: 'Revoke all sessions except the current one.',
        auth: true,
        params: [],
        exampleRequest: {
          curl: `curl -X DELETE ${BASE}/api/auth/sessions \\
  -H "Authorization: Bearer {token}"`,
          js: `const { data } = await axios.delete('${BASE}/api/auth/sessions', {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "message": "All other sessions have been revoked.",
  "revoked_count": 3
}`,
      },
    ],
  },
  {
    name: 'Multi-Factor Authentication',
    id: 'mfa',
    endpoints: [
      {
        method: 'GET',
        path: '/api/auth/mfa/status',
        id: 'mfa-status',
        description: 'Check whether MFA is enabled for the authenticated user.',
        auth: true,
        params: [],
        exampleRequest: {
          curl: `curl ${BASE}/api/auth/mfa/status \\
  -H "Authorization: Bearer {token}"`,
          js: `const { data } = await axios.get('${BASE}/api/auth/mfa/status', {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "mfa_enabled": true,
  "methods": ["totp", "email"],
  "recovery_codes_remaining": 8
}`,
      },
      {
        method: 'POST',
        path: '/api/auth/mfa/enable',
        id: 'mfa-enable',
        description: 'Begin MFA setup. Returns a TOTP secret and QR code URI.',
        auth: true,
        params: [
          { name: 'method', location: 'body', type: 'string', required: false, description: 'MFA method: "totp" (default) or "email"' },
        ],
        exampleRequest: {
          curl: `curl -X POST ${BASE}/api/auth/mfa/enable \\
  -H "Authorization: Bearer {token}" \\
  -H "Content-Type: application/json" \\
  -d '{ "method": "totp" }'`,
          js: `const { data } = await axios.post('${BASE}/api/auth/mfa/enable', {
  method: 'totp'
}, {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "secret": "JBSWY3DPEHPK3PXP",
  "qr_code_uri": "otpauth://totp/VoltexaHub:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=VoltexaHub",
  "recovery_codes": [
    "a1b2c3d4", "e5f6g7h8", "i9j0k1l2", "m3n4o5p6",
    "q7r8s9t0", "u1v2w3x4", "y5z6a7b8", "c9d0e1f2"
  ]
}`,
      },
      {
        method: 'POST',
        path: '/api/auth/mfa/confirm',
        id: 'mfa-confirm',
        description: 'Confirm MFA setup by providing a valid TOTP code.',
        auth: true,
        params: [
          { name: 'code', location: 'body', type: 'string', required: true, description: 'Six-digit TOTP code from authenticator app' },
        ],
        exampleRequest: {
          curl: `curl -X POST ${BASE}/api/auth/mfa/confirm \\
  -H "Authorization: Bearer {token}" \\
  -H "Content-Type: application/json" \\
  -d '{ "code": "123456" }'`,
          js: `const { data } = await axios.post('${BASE}/api/auth/mfa/confirm', {
  code: '123456'
}, {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "message": "MFA has been enabled successfully.",
  "mfa_enabled": true
}`,
      },
      {
        method: 'DELETE',
        path: '/api/auth/mfa/disable',
        id: 'mfa-disable',
        description: 'Disable MFA for the authenticated user. Requires current password.',
        auth: true,
        params: [
          { name: 'password', location: 'body', type: 'string', required: true, description: 'Current account password for verification' },
        ],
        exampleRequest: {
          curl: `curl -X DELETE ${BASE}/api/auth/mfa/disable \\
  -H "Authorization: Bearer {token}" \\
  -H "Content-Type: application/json" \\
  -d '{ "password": "securePass123!" }'`,
          js: `const { data } = await axios.delete('${BASE}/api/auth/mfa/disable', {
  headers: { Authorization: 'Bearer {token}' },
  data: { password: 'securePass123!' }
});`,
        },
        exampleResponse: `{
  "message": "MFA has been disabled.",
  "mfa_enabled": false
}`,
      },
      {
        method: 'POST',
        path: '/api/auth/mfa/verify',
        id: 'mfa-verify',
        description: 'Verify a TOTP or recovery code during login when MFA is required.',
        auth: false,
        params: [
          { name: 'mfa_token', location: 'body', type: 'string', required: true, description: 'Temporary MFA token from login response' },
          { name: 'code', location: 'body', type: 'string', required: true, description: 'TOTP code or recovery code' },
        ],
        exampleRequest: {
          curl: `curl -X POST ${BASE}/api/auth/mfa/verify \\
  -H "Content-Type: application/json" \\
  -d '{
    "mfa_token": "mfa_tmp_abc123",
    "code": "123456"
  }'`,
          js: `const { data } = await axios.post('${BASE}/api/auth/mfa/verify', {
  mfa_token: 'mfa_tmp_abc123',
  code: '123456'
});`,
        },
        exampleResponse: `{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "type": "bearer",
  "expires_at": "2025-10-15T10:30:00.000Z"
}`,
      },
      {
        method: 'POST',
        path: '/api/auth/mfa/email',
        id: 'mfa-email',
        description: 'Send a one-time MFA code to the user\'s email address.',
        auth: false,
        params: [
          { name: 'mfa_token', location: 'body', type: 'string', required: true, description: 'Temporary MFA token from login response' },
        ],
        exampleRequest: {
          curl: `curl -X POST ${BASE}/api/auth/mfa/email \\
  -H "Content-Type: application/json" \\
  -d '{ "mfa_token": "mfa_tmp_abc123" }'`,
          js: `const { data } = await axios.post('${BASE}/api/auth/mfa/email', {
  mfa_token: 'mfa_tmp_abc123'
});`,
        },
        exampleResponse: `{
  "message": "A verification code has been sent to your email."
}`,
      },
      {
        method: 'POST',
        path: '/api/auth/mfa/recovery-codes',
        id: 'mfa-recovery-codes',
        description: 'Regenerate MFA recovery codes. Invalidates all previous codes.',
        auth: true,
        params: [
          { name: 'password', location: 'body', type: 'string', required: true, description: 'Current account password for verification' },
        ],
        exampleRequest: {
          curl: `curl -X POST ${BASE}/api/auth/mfa/recovery-codes \\
  -H "Authorization: Bearer {token}" \\
  -H "Content-Type: application/json" \\
  -d '{ "password": "securePass123!" }'`,
          js: `const { data } = await axios.post('${BASE}/api/auth/mfa/recovery-codes', {
  password: 'securePass123!'
}, {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "recovery_codes": [
    "x1y2z3a4", "b5c6d7e8", "f9g0h1i2", "j3k4l5m6",
    "n7o8p9q0", "r1s2t3u4", "v5w6x7y8", "z9a0b1c2"
  ],
  "message": "New recovery codes generated. Previous codes are now invalid."
}`,
      },
    ],
  },
  {
    name: 'Forums',
    id: 'forums',
    endpoints: [
      {
        method: 'GET',
        path: '/api/forums',
        id: 'forums-list',
        description: 'List all forum categories and their sub-forums.',
        auth: false,
        params: [],
        exampleRequest: {
          curl: `curl ${BASE}/api/forums`,
          js: `const { data } = await axios.get('${BASE}/api/forums');`,
        },
        exampleResponse: `{
  "forums": [
    {
      "id": 1,
      "name": "General Discussion",
      "slug": "general-discussion",
      "description": "Talk about anything related to VoltexaHub.",
      "thread_count": 245,
      "post_count": 1832,
      "last_post": {
        "id": 5012,
        "thread_title": "Welcome to VoltexaHub!",
        "author": "admin",
        "created_at": "2025-09-15T09:00:00.000Z"
      }
    }
  ]
}`,
      },
      {
        method: 'GET',
        path: '/api/categories',
        id: 'categories-list',
        description: 'List all top-level forum categories.',
        auth: false,
        params: [],
        exampleRequest: {
          curl: `curl ${BASE}/api/categories`,
          js: `const { data } = await axios.get('${BASE}/api/categories');`,
        },
        exampleResponse: `{
  "categories": [
    {
      "id": 1,
      "name": "Community",
      "slug": "community",
      "order": 0,
      "forums_count": 4
    },
    {
      "id": 2,
      "name": "Support",
      "slug": "support",
      "order": 1,
      "forums_count": 3
    }
  ]
}`,
      },
      {
        method: 'GET',
        path: '/api/forums/{slug}/threads',
        id: 'forum-threads',
        description: 'List threads in a specific forum. Supports pagination.',
        auth: false,
        params: [
          { name: 'slug', location: 'path', type: 'string', required: true, description: 'Forum slug identifier' },
          { name: 'page', location: 'query', type: 'integer', required: false, description: 'Page number (default: 1)' },
          { name: 'per_page', location: 'query', type: 'integer', required: false, description: 'Results per page (default: 20, max: 50)' },
          { name: 'sort', location: 'query', type: 'string', required: false, description: 'Sort by: "latest", "popular", "oldest"' },
        ],
        exampleRequest: {
          curl: `curl "${BASE}/api/forums/general-discussion/threads?page=1&per_page=10"`,
          js: `const { data } = await axios.get('${BASE}/api/forums/general-discussion/threads', {
  params: { page: 1, per_page: 10 }
});`,
        },
        exampleResponse: `{
  "threads": [
    {
      "id": 101,
      "title": "Welcome to VoltexaHub!",
      "slug": "welcome-to-voltexahub",
      "author": { "id": 1, "username": "admin", "avatar_url": "/avatars/admin.png" },
      "reply_count": 34,
      "view_count": 1520,
      "is_pinned": true,
      "is_locked": false,
      "created_at": "2025-01-01T00:00:00.000Z",
      "last_reply_at": "2025-09-15T09:00:00.000Z"
    }
  ],
  "meta": { "current_page": 1, "last_page": 5, "per_page": 10, "total": 48 }
}`,
      },
    ],
  },
  {
    name: 'Threads & Posts',
    id: 'threads-posts',
    endpoints: [
      {
        method: 'POST',
        path: '/api/forums/{slug}/threads',
        id: 'thread-create',
        description: 'Create a new thread in a forum.',
        auth: true,
        params: [
          { name: 'slug', location: 'path', type: 'string', required: true, description: 'Forum slug to create thread in' },
          { name: 'title', location: 'body', type: 'string', required: true, description: 'Thread title (5-200 chars)' },
          { name: 'body', location: 'body', type: 'string', required: true, description: 'Thread body content (supports Markdown)' },
          { name: 'tags', location: 'body', type: 'array', required: false, description: 'Array of tag strings' },
        ],
        exampleRequest: {
          curl: `curl -X POST ${BASE}/api/forums/general-discussion/threads \\
  -H "Authorization: Bearer {token}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "How do I get started?",
    "body": "Looking for a guide to get started with the platform.",
    "tags": ["help", "beginner"]
  }'`,
          js: `const { data } = await axios.post('${BASE}/api/forums/general-discussion/threads', {
  title: 'How do I get started?',
  body: 'Looking for a guide to get started with the platform.',
  tags: ['help', 'beginner']
}, {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "thread": {
    "id": 102,
    "title": "How do I get started?",
    "slug": "how-do-i-get-started",
    "author": { "id": 42, "username": "newuser" },
    "body": "Looking for a guide to get started with the platform.",
    "tags": ["help", "beginner"],
    "created_at": "2025-09-15T11:00:00.000Z"
  }
}`,
      },
      {
        method: 'GET',
        path: '/api/posts/{id}',
        id: 'post-get',
        description: 'Retrieve a single post by its ID.',
        auth: false,
        params: [
          { name: 'id', location: 'path', type: 'integer', required: true, description: 'Post ID' },
        ],
        exampleRequest: {
          curl: `curl ${BASE}/api/posts/5012`,
          js: `const { data } = await axios.get('${BASE}/api/posts/5012');`,
        },
        exampleResponse: `{
  "post": {
    "id": 5012,
    "thread_id": 101,
    "author": { "id": 1, "username": "admin", "avatar_url": "/avatars/admin.png" },
    "body": "Welcome everyone! Feel free to introduce yourselves.",
    "likes_count": 15,
    "reactions": { "👍": 10, "❤️": 5 },
    "created_at": "2025-01-01T00:00:00.000Z",
    "updated_at": "2025-01-01T00:00:00.000Z"
  }
}`,
      },
      {
        method: 'PUT',
        path: '/api/posts/{id}',
        id: 'post-update',
        description: 'Update an existing post. Only the author or moderators can edit.',
        auth: true,
        params: [
          { name: 'id', location: 'path', type: 'integer', required: true, description: 'Post ID' },
          { name: 'body', location: 'body', type: 'string', required: true, description: 'Updated post content' },
        ],
        exampleRequest: {
          curl: `curl -X PUT ${BASE}/api/posts/5012 \\
  -H "Authorization: Bearer {token}" \\
  -H "Content-Type: application/json" \\
  -d '{ "body": "Updated: Welcome everyone! Check out the getting started guide." }'`,
          js: `const { data } = await axios.put('${BASE}/api/posts/5012', {
  body: 'Updated: Welcome everyone! Check out the getting started guide.'
}, {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "post": {
    "id": 5012,
    "body": "Updated: Welcome everyone! Check out the getting started guide.",
    "updated_at": "2025-09-15T12:00:00.000Z",
    "edited": true
  }
}`,
      },
      {
        method: 'DELETE',
        path: '/api/posts/{id}',
        id: 'post-delete',
        description: 'Delete a post. Only the author or moderators can delete.',
        auth: true,
        params: [
          { name: 'id', location: 'path', type: 'integer', required: true, description: 'Post ID' },
        ],
        exampleRequest: {
          curl: `curl -X DELETE ${BASE}/api/posts/5012 \\
  -H "Authorization: Bearer {token}"`,
          js: `const { data } = await axios.delete('${BASE}/api/posts/5012', {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "message": "Post deleted successfully."
}`,
      },
      {
        method: 'POST',
        path: '/api/posts/{id}/like',
        id: 'post-like',
        description: 'Toggle a like on a post.',
        auth: true,
        params: [
          { name: 'id', location: 'path', type: 'integer', required: true, description: 'Post ID' },
        ],
        exampleRequest: {
          curl: `curl -X POST ${BASE}/api/posts/5012/like \\
  -H "Authorization: Bearer {token}"`,
          js: `const { data } = await axios.post('${BASE}/api/posts/5012/like', null, {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "liked": true,
  "likes_count": 16
}`,
      },
      {
        method: 'POST',
        path: '/api/posts/{id}/react',
        id: 'post-react',
        description: 'Add or remove a reaction emoji on a post.',
        auth: true,
        params: [
          { name: 'id', location: 'path', type: 'integer', required: true, description: 'Post ID' },
          { name: 'emoji', location: 'body', type: 'string', required: true, description: 'Emoji to react with (e.g. "👍", "❤️", "🎉")' },
        ],
        exampleRequest: {
          curl: `curl -X POST ${BASE}/api/posts/5012/react \\
  -H "Authorization: Bearer {token}" \\
  -H "Content-Type: application/json" \\
  -d '{ "emoji": "🎉" }'`,
          js: `const { data } = await axios.post('${BASE}/api/posts/5012/react', {
  emoji: '🎉'
}, {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "reaction": "🎉",
  "added": true,
  "reactions": { "👍": 10, "❤️": 5, "🎉": 1 }
}`,
      },
    ],
  },
  {
    name: 'Users & Profiles',
    id: 'users',
    endpoints: [
      {
        method: 'GET',
        path: '/api/members',
        id: 'members-list',
        description: 'List community members with pagination and optional search.',
        auth: false,
        params: [
          { name: 'page', location: 'query', type: 'integer', required: false, description: 'Page number (default: 1)' },
          { name: 'per_page', location: 'query', type: 'integer', required: false, description: 'Results per page (default: 20)' },
          { name: 'search', location: 'query', type: 'string', required: false, description: 'Search by username' },
          { name: 'role', location: 'query', type: 'string', required: false, description: 'Filter by role slug' },
        ],
        exampleRequest: {
          curl: `curl "${BASE}/api/members?page=1&per_page=10"`,
          js: `const { data } = await axios.get('${BASE}/api/members', {
  params: { page: 1, per_page: 10 }
});`,
        },
        exampleResponse: `{
  "members": [
    {
      "id": 1,
      "username": "admin",
      "avatar_url": "/avatars/admin.png",
      "role": { "name": "Administrator", "color": "#ef4444" },
      "post_count": 523,
      "joined_at": "2024-06-01T00:00:00.000Z"
    }
  ],
  "meta": { "current_page": 1, "last_page": 10, "per_page": 10, "total": 98 }
}`,
      },
      {
        method: 'GET',
        path: '/api/roles',
        id: 'roles-list',
        description: 'List all available community roles.',
        auth: false,
        params: [],
        exampleRequest: {
          curl: `curl ${BASE}/api/roles`,
          js: `const { data } = await axios.get('${BASE}/api/roles');`,
        },
        exampleResponse: `{
  "roles": [
    { "id": 1, "name": "Administrator", "slug": "admin", "color": "#ef4444" },
    { "id": 2, "name": "Moderator", "slug": "moderator", "color": "#f59e0b" },
    { "id": 3, "name": "Member", "slug": "member", "color": "#6b7280" },
    { "id": 4, "name": "VIP", "slug": "vip", "color": "#7c3aed" }
  ]
}`,
      },
      {
        method: 'GET',
        path: '/api/staff',
        id: 'staff-list',
        description: 'List all staff members (administrators and moderators).',
        auth: false,
        params: [],
        exampleRequest: {
          curl: `curl ${BASE}/api/staff`,
          js: `const { data } = await axios.get('${BASE}/api/staff');`,
        },
        exampleResponse: `{
  "staff": [
    {
      "id": 1,
      "username": "admin",
      "avatar_url": "/avatars/admin.png",
      "role": { "name": "Administrator", "color": "#ef4444" },
      "bio": "Platform founder and lead developer."
    }
  ]
}`,
      },
    ],
  },
  {
    name: 'Search',
    id: 'search',
    endpoints: [
      {
        method: 'GET',
        path: '/api/search',
        id: 'search-global',
        description: 'Search across threads, posts, and members.',
        auth: false,
        params: [
          { name: 'q', location: 'query', type: 'string', required: true, description: 'Search query string' },
          { name: 'type', location: 'query', type: 'string', required: false, description: 'Filter by type: "threads", "posts", "members"' },
          { name: 'page', location: 'query', type: 'integer', required: false, description: 'Page number (default: 1)' },
        ],
        exampleRequest: {
          curl: `curl "${BASE}/api/search?q=getting+started&type=threads"`,
          js: `const { data } = await axios.get('${BASE}/api/search', {
  params: { q: 'getting started', type: 'threads' }
});`,
        },
        exampleResponse: `{
  "results": [
    {
      "type": "thread",
      "id": 102,
      "title": "How do I get started?",
      "excerpt": "Looking for a guide to get started with the platform...",
      "author": "newuser",
      "created_at": "2025-09-15T11:00:00.000Z"
    }
  ],
  "meta": { "current_page": 1, "total": 3 }
}`,
      },
    ],
  },
  {
    name: 'Leaderboard',
    id: 'leaderboard',
    endpoints: [
      {
        method: 'GET',
        path: '/api/leaderboard',
        id: 'leaderboard-get',
        description: 'Get the community leaderboard ranked by points/activity.',
        auth: false,
        params: [
          { name: 'period', location: 'query', type: 'string', required: false, description: 'Time period: "all", "monthly", "weekly" (default: "all")' },
          { name: 'limit', location: 'query', type: 'integer', required: false, description: 'Number of entries (default: 25, max: 100)' },
        ],
        exampleRequest: {
          curl: `curl "${BASE}/api/leaderboard?period=monthly&limit=10"`,
          js: `const { data } = await axios.get('${BASE}/api/leaderboard', {
  params: { period: 'monthly', limit: 10 }
});`,
        },
        exampleResponse: `{
  "leaderboard": [
    {
      "rank": 1,
      "user": { "id": 1, "username": "admin", "avatar_url": "/avatars/admin.png" },
      "points": 4520,
      "posts": 142,
      "likes_received": 890
    },
    {
      "rank": 2,
      "user": { "id": 7, "username": "poweruser", "avatar_url": "/avatars/poweruser.png" },
      "points": 3100,
      "posts": 98,
      "likes_received": 612
    }
  ],
  "period": "monthly"
}`,
      },
    ],
  },
  {
    name: 'Notifications',
    id: 'notifications',
    endpoints: [
      {
        method: 'GET',
        path: '/api/notifications',
        id: 'notifications-list',
        description: 'List notifications for the authenticated user.',
        auth: true,
        params: [
          { name: 'page', location: 'query', type: 'integer', required: false, description: 'Page number (default: 1)' },
          { name: 'unread_only', location: 'query', type: 'boolean', required: false, description: 'Only return unread notifications' },
        ],
        exampleRequest: {
          curl: `curl "${BASE}/api/notifications?unread_only=true" \\
  -H "Authorization: Bearer {token}"`,
          js: `const { data } = await axios.get('${BASE}/api/notifications', {
  params: { unread_only: true },
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "notifications": [
    {
      "id": 501,
      "type": "post_reply",
      "message": "admin replied to your thread",
      "data": { "thread_id": 102, "post_id": 5100 },
      "read": false,
      "created_at": "2025-09-15T12:30:00.000Z"
    }
  ],
  "meta": { "current_page": 1, "total": 5, "unread_count": 3 }
}`,
      },
      {
        method: 'POST',
        path: '/api/notifications/{id}/read',
        id: 'notification-read',
        description: 'Mark a single notification as read.',
        auth: true,
        params: [
          { name: 'id', location: 'path', type: 'integer', required: true, description: 'Notification ID' },
        ],
        exampleRequest: {
          curl: `curl -X POST ${BASE}/api/notifications/501/read \\
  -H "Authorization: Bearer {token}"`,
          js: `const { data } = await axios.post('${BASE}/api/notifications/501/read', null, {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "message": "Notification marked as read."
}`,
      },
      {
        method: 'POST',
        path: '/api/notifications/read-all',
        id: 'notifications-read-all',
        description: 'Mark all notifications as read.',
        auth: true,
        params: [],
        exampleRequest: {
          curl: `curl -X POST ${BASE}/api/notifications/read-all \\
  -H "Authorization: Bearer {token}"`,
          js: `const { data } = await axios.post('${BASE}/api/notifications/read-all', null, {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "message": "All notifications marked as read.",
  "updated_count": 5
}`,
      },
      {
        method: 'DELETE',
        path: '/api/notifications/{id}',
        id: 'notification-delete',
        description: 'Delete a specific notification.',
        auth: true,
        params: [
          { name: 'id', location: 'path', type: 'integer', required: true, description: 'Notification ID' },
        ],
        exampleRequest: {
          curl: `curl -X DELETE ${BASE}/api/notifications/501 \\
  -H "Authorization: Bearer {token}"`,
          js: `const { data } = await axios.delete('${BASE}/api/notifications/501', {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "message": "Notification deleted."
}`,
      },
      {
        method: 'GET',
        path: '/api/messages/unread-count',
        id: 'messages-unread-count',
        description: 'Get the number of unread private messages.',
        auth: true,
        params: [],
        exampleRequest: {
          curl: `curl ${BASE}/api/messages/unread-count \\
  -H "Authorization: Bearer {token}"`,
          js: `const { data } = await axios.get('${BASE}/api/messages/unread-count', {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "unread_count": 2
}`,
      },
    ],
  },
  {
    name: 'Store & Payments',
    id: 'store',
    endpoints: [
      {
        method: 'GET',
        path: '/api/store/items',
        id: 'store-items',
        description: 'List all available store items.',
        auth: false,
        params: [
          { name: 'category', location: 'query', type: 'string', required: false, description: 'Filter by category slug' },
        ],
        exampleRequest: {
          curl: `curl ${BASE}/api/store/items`,
          js: `const { data } = await axios.get('${BASE}/api/store/items');`,
        },
        exampleResponse: `{
  "items": [
    {
      "id": 1,
      "name": "VIP Membership",
      "slug": "vip-membership",
      "description": "Unlock VIP features and badge.",
      "price": 9.99,
      "currency": "USD",
      "category": "memberships",
      "image_url": "/store/vip.png"
    },
    {
      "id": 2,
      "name": "Custom Username Color",
      "slug": "custom-username-color",
      "description": "Choose a custom color for your username.",
      "price": 4.99,
      "currency": "USD",
      "category": "cosmetics",
      "image_url": "/store/color.png"
    }
  ]
}`,
      },
      {
        method: 'GET',
        path: '/api/store/currency',
        id: 'store-currency',
        description: 'Get current exchange rates and supported currencies.',
        auth: false,
        params: [],
        exampleRequest: {
          curl: `curl ${BASE}/api/store/currency`,
          js: `const { data } = await axios.get('${BASE}/api/store/currency');`,
        },
        exampleResponse: `{
  "base_currency": "USD",
  "supported": ["USD", "EUR", "GBP", "BTC", "ETH"],
  "rates": {
    "EUR": 0.92,
    "GBP": 0.79
  }
}`,
      },
      {
        method: 'GET',
        path: '/api/payment-providers',
        id: 'payment-providers',
        description: 'List available payment providers.',
        auth: false,
        params: [],
        exampleRequest: {
          curl: `curl ${BASE}/api/payment-providers`,
          js: `const { data } = await axios.get('${BASE}/api/payment-providers');`,
        },
        exampleResponse: `{
  "providers": [
    { "id": "stripe", "name": "Stripe", "methods": ["card"], "enabled": true },
    { "id": "plisio", "name": "Plisio", "methods": ["crypto"], "enabled": true }
  ]
}`,
      },
      {
        method: 'GET',
        path: '/api/payment-providers/plisio/currencies',
        id: 'plisio-currencies',
        description: 'List supported crypto currencies for Plisio payments.',
        auth: false,
        params: [],
        exampleRequest: {
          curl: `curl ${BASE}/api/payment-providers/plisio/currencies`,
          js: `const { data } = await axios.get('${BASE}/api/payment-providers/plisio/currencies');`,
        },
        exampleResponse: `{
  "currencies": [
    { "code": "BTC", "name": "Bitcoin", "min_amount": 0.0001 },
    { "code": "ETH", "name": "Ethereum", "min_amount": 0.001 },
    { "code": "LTC", "name": "Litecoin", "min_amount": 0.01 },
    { "code": "USDT", "name": "Tether (TRC20)", "min_amount": 1.00 }
  ]
}`,
      },
      {
        method: 'POST',
        path: '/api/store/checkout',
        id: 'store-checkout',
        description: 'Initiate a checkout session for one or more store items.',
        auth: true,
        params: [
          { name: 'items', location: 'body', type: 'array', required: true, description: 'Array of { item_id, quantity }' },
          { name: 'provider', location: 'body', type: 'string', required: true, description: 'Payment provider: "stripe" or "plisio"' },
          { name: 'currency', location: 'body', type: 'string', required: false, description: 'Crypto currency code (for Plisio)' },
        ],
        exampleRequest: {
          curl: `curl -X POST ${BASE}/api/store/checkout \\
  -H "Authorization: Bearer {token}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "items": [{ "item_id": 1, "quantity": 1 }],
    "provider": "stripe"
  }'`,
          js: `const { data } = await axios.post('${BASE}/api/store/checkout', {
  items: [{ item_id: 1, quantity: 1 }],
  provider: 'stripe'
}, {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "checkout_url": "https://checkout.stripe.com/c/cs_live_abc123",
  "session_id": "cs_live_abc123",
  "expires_at": "2025-09-15T13:00:00.000Z"
}`,
      },
      {
        method: 'POST',
        path: '/api/store/purchase',
        id: 'store-purchase',
        description: 'Complete a purchase using platform credits or a verified payment.',
        auth: true,
        params: [
          { name: 'item_id', location: 'body', type: 'integer', required: true, description: 'Store item ID' },
          { name: 'payment_method', location: 'body', type: 'string', required: true, description: '"credits" or "checkout_session"' },
          { name: 'session_id', location: 'body', type: 'string', required: false, description: 'Checkout session ID (if using checkout_session)' },
        ],
        exampleRequest: {
          curl: `curl -X POST ${BASE}/api/store/purchase \\
  -H "Authorization: Bearer {token}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "item_id": 2,
    "payment_method": "credits"
  }'`,
          js: `const { data } = await axios.post('${BASE}/api/store/purchase', {
  item_id: 2,
  payment_method: 'credits'
}, {
  headers: { Authorization: 'Bearer {token}' }
});`,
        },
        exampleResponse: `{
  "purchase": {
    "id": "pur_x1y2z3",
    "item": "Custom Username Color",
    "amount": 4.99,
    "method": "credits",
    "status": "completed",
    "created_at": "2025-09-15T12:45:00.000Z"
  },
  "remaining_credits": 15.01
}`,
      },
    ],
  },
  {
    name: 'Health',
    id: 'health',
    endpoints: [
      {
        method: 'GET',
        path: '/api/health/queue',
        id: 'health-queue',
        description: 'Check the status of background job queues.',
        auth: false,
        params: [],
        exampleRequest: {
          curl: `curl ${BASE}/api/health/queue`,
          js: `const { data } = await axios.get('${BASE}/api/health/queue');`,
        },
        exampleResponse: `{
  "status": "healthy",
  "queues": {
    "default": { "pending": 0, "processing": 2, "failed": 0 },
    "emails": { "pending": 1, "processing": 0, "failed": 0 },
    "notifications": { "pending": 5, "processing": 1, "failed": 0 }
  },
  "uptime_seconds": 864000
}`,
      },
    ],
  },
]
