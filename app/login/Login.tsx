'use client';
import { Form, Events } from 'jabb-astro-components';
import { useState } from 'react';
import Database from '@/functions/classes/dbClient';
import { login } from '../../functions/server';
import Database from '@/functions/classes/database';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [response, setResponse] = useState<Forms.Response | undefined>();
  const [credentials, setCredentials] = useState<Forms.Data>({});

  async function submit() {
    setResponse(undefined);
    try {
      Events.Utils.show('loading', true);
      await Database.login(credentials.username!, credentials.password!);

      let result: Forms.Response = await login(credentials);

      setResponse(result);

      if (result.status >= 200 && result.status <= 299) {
        Events.Utils.show('loading', false);
        return router.push('/dashboard');
      } else {
        Events.Utils.show('loading', false);
      }
    } catch {
      Events.Utils.show('loading', false);
    }
  }

  return (
    <section className="m-auto p-12 md:w-7/12">
      <Form.Login1
        submit={() => submit()}
        response={response}
        credentials={credentials}
        setCredentials={setCredentials}
        loader="/images/loading.gif"
      />
    </section>
  );
}
