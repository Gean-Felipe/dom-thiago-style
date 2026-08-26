CREATE TABLE public.solicitacoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL DEFAULT auth.uid(),
  tipo TEXT NOT NULL DEFAULT 'agendamento',
  nome TEXT NOT NULL,
  telefone TEXT,
  servico TEXT,
  preferencia TEXT,
  observacoes TEXT,
  status TEXT NOT NULL DEFAULT 'novo',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX solicitacoes_user_id_idx ON public.solicitacoes (user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.solicitacoes TO authenticated;
GRANT ALL ON public.solicitacoes TO service_role;

ALTER TABLE public.solicitacoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own solicitacoes"
  ON public.solicitacoes FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_solicitacoes_updated_at
BEFORE UPDATE ON public.solicitacoes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();